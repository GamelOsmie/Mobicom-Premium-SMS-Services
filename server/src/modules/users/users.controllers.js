const errorResponse = require('../../utils/errorResponse');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const slugify = require('slugify');
const User = require('./users.model');
const Excel = require('exceljs');
// const paginate = require('../../utils/paginationConfig');

// token generator
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '365d' });
};

// POST | api/v1/auth/signup
const createUser = async (req, res, next) => {
  const {
    user_role,
    username,
    first_name,
    last_name,
    middle_name,
    email,
    phone_number,
    password,
  } = req.body;

  try {
    const user = await User.signup(
      user_role,
      username,
      first_name,
      last_name,
      middle_name,
      email,
      phone_number,
      password,
    );

    return res.status(201).json({
      status: 'success',
      message: `${username} added successfully`,
      data: {
        _id: user._id,
        phone_number: user.phone_number,
        user_role: user.user_role,
        username: user.username,
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        email: user.email,
        verification_code: user.verification_code,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      const uniqueField = Object.keys(User.schema.paths).find(
        (key) => User.schema.paths[key].options.unique,
      );
      next(errorResponse(400, `${uniqueField} already exists`));
    } else {
      next(errorResponse(400, error.message));
    }
  }
};

//POST | api/v1/auth/login
const login = async (req, res, next) => {
  const { phone_number, password } = req.body;

  try {
    const user = await User.login(phone_number, password);

    //destructure the user for to return as response
    const {
      _id,
      user_role,
      username,
      first_name,
      last_name,
      middle_name,
      email,
      is_active,
      verified,
      slug,
    } = user;

    //create sign in token from jwt
    const token = createToken(user._id);

    //cookie options
    const cookieOptions = {
      //cookie age is 30days
      maxAge: 1000 * 60 * 60 * 24 * 30,

      //TODO: remember to set secure back to true in production
      secure: false,
      httpOnly: true,
    };

    return res
      .status(200)
      .cookie('token', token, { ...cookieOptions })
      .json({
        status: 'success',
        message: 'Login successful',
        data: {
          _id,
          user_role,
          username,
          first_name,
          last_name,
          middle_name,
          email,
          phone_number,
          is_active,
          verified,
          slug,
        },
      });
  } catch (error) {
    next(errorResponse(400, error.message));
  }
};

const logout = async (req, res, next) => {
  try {
    return res
      .status(200)
      .cookie('token', '', { maxAge: 1000 })
      .json({ status: 'success', message: 'Logout successful', data: null });
  } catch (error) {
    next(errorResponse(400, "Sorry!, couldn't logout. An error occurred"));
  }
};

//POST | api/v1/auth/verify
const verifyAccount = async (req, res, next) => {
  const { verification_code } = req.body;

  try {
    // find the user with the entered verification code
    // reset the verification code to 0000 to avoid future conflicts and update the verified status
    const user = await User.findOneAndUpdate(
      { verification_code },
      { verification_code: null, verified: true },
      { new: true },
    );

    return res.status(200).json({
      status: 'success',
      message: 'Account successfully verified',
      data: {
        _id: user._id,
        phone_number: user.phone_number,
        verified: user.verified,
      },
    });
  } catch (error) {
    next(errorResponse(400, 'wrong verification code'));
  }
};

// GET | api/v1/users
// ACCESS | Super Admin, Admin, Organization Admin
const getUsers = async (req, res, next) => {
  //check if the user belongs to an organization and restrict search to user's organization
  const { user_role, _id } = req.user;
  // const pageSize = 15;
  // const pageNum = parseInt(req.query.page);

  let users;
  // let count;

  try {
    // Super Admin sees all users except other super admin
    if (user_role == 'Super Admin') {
      users = await User.find({
        _id: { $ne: _id },
        user_role: { $ne: 'Super Admin' },
      })
        .select('-password')
        .sort({ first_name: 1, last_name: 1 });
      // .skip(pageSize * (pageNum - 1))
      // .limit(pageSize);

      // count = await User.countDocuments({
      //   _id: { $ne: _id },
      //   user_role: { $ne: 'Super Admin' },
      // });
    }

    // Prevent Admin from seeing admins a
    if (user_role == 'Admin') {
      users = await User.find({
        _id: { $ne: _id },
        user_role: { $ne: 'Super Admin' || 'Admin' },
      })
        .select('-password')
        .sort({ first_name: 1, last_name: 1 });
      // .skip(pageSize * (pageNum - 1))
      // .limit(pageSize);

      // count = await User.countDocuments({
      //   _id: { $ne: _id },
      //   user_role: { $ne: 'Super Admin' || 'Admin' },
      // });
    }

    // const meta = paginate({ count, pageNum, pageSize, req });

    return res.status(200).json({
      status: 'success',
      message: 'Users fetched successfully',
      data: users,
      // meta,
    });
  } catch (error) {
    next(errorResponse(400, error.message));
  }
};

// GET | api/v1/users/me
// ACCESS | user
const getMe = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id).select('-password');

    if (!user) {
      return next(errorResponse(404, 'User not found'));
    }

    return res.status(200).json({
      status: 'success',
      message: 'User fetched successfully',
      data: user,
    });
  } catch (error) {
    next(errorResponse(404, error.message));
  }
};

// GET | api/v1/user
// ACCESS | Super Admin, Admin
const getUser = async (req, res, next) => {
  const { slug } = req.params;
  const { user_role } = req.user;

  try {
    let user;

    // if user belongs to an organization, fetch users that belongs to their organization
    if (user_role == 'Super Admin') {
      user = await User.findOne({
        slug,
        user_role: { $ne: 'Super Admin' },
      }).select('-password');

      if (!user) {
        return next(errorResponse(404, 'User not found'));
      }
    }

    if (user_role == 'Admin') {
      user = await User.findOne({
        slug,
        user_role: { $ne: 'Super Admin' || 'Admin' },
      }).select('-password');

      if (!user) {
        return next(errorResponse(404, 'User not found'));
      }
    }

    return res.status(200).json({
      status: 'success',
      message: 'User fetched successfully',
      data: user,
    });
  } catch (error) {
    next(errorResponse(404, 'User not found'));
  }
};

// PUT | api/v1/users/:slug
// ACCESS | Super Admin, Admin
const updateUser = async (req, res, next) => {
  const { slug } = req.params;
  const { user_role: currentUserRole } = req.user;
  const {
    user_role,
    username,
    first_name,
    last_name,
    middle_name,
    email,
    phone_number,
    is_active,
  } = req.body;

  //check if user is Super Admin and restrict editing a super admin or another admin
  const targetedUser = await User.findOne({ slug });

  //confirm if user exist
  if (!targetedUser) {
    return next(errorResponse(404, 'User not found'));
  }

  // confirm if user is not admin or super admin
  if (
    (targetedUser.user_role === 'Super Admin' && currentUserRole === 'Admin') ||
    (targetedUser.user_role === 'Admin' && currentUserRole === 'Admin')
  ) {
    return next(
      errorResponse(401, "You don't have authorization to update user"),
    );
  }

  try {
    const user = await User.findOneAndUpdate(
      { slug },
      {
        slug: slugify(username, { lower: true }),
        user_role,
        username,
        first_name,
        last_name,
        middle_name,
        email,
        phone_number,
        is_active,
      },
      { new: true },
    );

    return res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: {
        slug: user.slug,
        user_role: user.user_role,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        middle_name: user.middle_name,
        email: user.email,
        phone_number: user.phone_number,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      const uniqueField = Object.keys(User.schema.paths).find(
        (key) => User.schema.paths[key].options.unique,
      );
      next(errorResponse(400, `${uniqueField} already exists`));
    } else {
      next(errorResponse(400, error.message));
    }
  }
};

// PUT | api/v1/users/update/profile
// ACCESS | Self
const updateSelf = async (req, res, next) => {
  const { _id } = req.user;
  const {
    username,
    first_name,
    last_name,
    middle_name,
    email,
    phone_number,
  } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id },
      {
        slug: slugify(username, { lower: true }),
        username,
        first_name,
        last_name,
        middle_name,
        email,
        phone_number,
      },
      { new: true, runValidators: true },
    );

    return res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully',
      data: {
        slug: user.slug,
        user_role: user.user_role,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        middle_name: user.middle_name,
        email: user.email,
        phone_number: user.phone_number,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      const uniqueField = Object.keys(User.schema.paths).find(
        (key) => User.schema.paths[key].options.unique,
      );
      next(errorResponse(400, `${uniqueField} already exists`));
    } else {
      next(errorResponse(400, error.message));
    }
  }
};

// PUT | api/v1/users/update/password
// ACCESS | Self
const updatePassword = async (req, res, next) => {
  const { _id } = req.user;
  const { current_password, new_password } = req.body;

  if (!current_password || !new_password) {
    return next(errorResponse(400, 'All fields must be filled'));
  }

  if (new_password.length < 6) {
    return next(
      errorResponse(
        400,
        'Your new password must be at least 6 characters long',
      ),
    );
  }

  // check if phone number already exist in our system
  const user = await User.findOne({ _id });
  const match = await bcrypt.compare(current_password, user.password);

  if (!match) {
    return next(errorResponse(400, 'Your current password is incorrect'));
  }

  //hash the new password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(new_password, salt);

  try {
    //update current password
    await User.findOneAndUpdate({ _id }, { password: hash });

    return res.status(200).json({
      status: 'success',
      message: 'Password changed successfully',
      data: null
    });
  } catch (error) {
    next(errorResponse(400, error.message));
  }
};

// download users
const downloadUsers = async (req, res, next) => {
  const { user_role, _id } = req.user;
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Retail Customers');
  workbook.creator = 'Mobicom Premium SMS';
  workbook.created = new Date();

  let users;

  if (user_role == 'Super Admin') {
    users = await User.find({
      _id: { $ne: _id },
      user_role: { $ne: 'Super Admin' },
    })
      .select(
        'first_name middle_name last_name username phone_number email user_role is_active',
      )
      .sort({ first_name: 1, last_name: 1 });
  }

  // Prevent Admin from seeing admins a
  if (user_role == 'Admin') {
    users = await User.find({
      _id: { $ne: _id },
      user_role: { $ne: 'Super Admin' || 'Admin' },
    })
      .select(
        'first_name middle_name last_name username phone_number email user_role is_active',
      )
      .sort({ first_name: 1, last_name: 1 });
  }

  // define the data to be added to the worksheet
  worksheet.columns = [
    { header: 'First Name', key: 'first_name', width: 30 },
    { header: 'Middle Name', key: 'middle_name', width: 30 },
    { header: 'Last Name', key: 'last_name', width: 30 },
    { header: 'Username', key: 'username', width: 30 },
    { header: 'Phone Number', key: 'phone_number', width: 30 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Role', key: 'user_role', width: 30 },
    { header: 'Is Active', key: 'is_active', width: 30 },
  ];

  // add the data to the worksheet
  worksheet.addRows(users);

  // set the response headers to indicate a downloadable file
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  );
  res.setHeader(
    'Content-Disposition',
    'attachment; filename=' +
      `Mobicom Premium SMS Platform Users - ${new Date().toDateString()}` +
      '.xlsx',
  );

  // write the workbook to the response stream
  // Generate and send the file to the client
  await workbook.xlsx.write(res);
  res.end();
};

module.exports = {
  login,
  logout,
  createUser,
  verifyAccount,
  getUsers,
  getMe,
  getUser,
  updateUser,
  updateSelf,
  updatePassword,
  downloadUsers,
};
