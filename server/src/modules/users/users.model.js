const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const slugify = require('slugify');
const validator = require('validator');

const UserSchema = new Schema(
  {
    slug: String,
    user_role: {
      type: String,
      enum: ['Super Admin', 'Admin', 'Content Creator'],
      required: true,
    },
    username: {
      type: String,
      required: true,
      sparse: true,
      minLength: 4,
      maxLength: 15,
      unique: true,
      trim: true,
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    middle_name: String,
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      sparse: true,
    },
    phone_number: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
      match: /^[0-9]{9,12}$/g,
      minlength: 9,
      maxLength: 12,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
  },
);

//static signup method
UserSchema.statics.signup = async function (
  user_role,
  username,
  first_name,
  last_name,
  middle_name,
  email,
  phone_number,
  password,
) {
  //check if pass and phone numbers exist
  if (
    !user_role ||
    !username ||
    !first_name ||
    !last_name ||
    !phone_number ||
    !password ||
    !email
  ) {
    throw new Error('All fields must be filled');
  }

  // check if phone number already exist in our system
  const phoneNumberExists = await this.findOne({ phone_number });

  if (phoneNumberExists) {
    throw new Error('Phone number already in use');
  }

  const usernameExists = await this.findOne({ username });

  if (usernameExists) {
    throw new Error('Username already in use');
  }

  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw new Error('Email already in use');
  }

  //validate email
  if (email && !validator.isEmail(email)) {
    throw new Error('Email is not valid');
  }

  // check if phone number already exist in our system
  if (email) {
    const emailExists = await this.findOne({ email });

    if (emailExists) {
      throw new Error('Email already in use');
    }
  }

  //check if username has no spaces
  if (username.includes(' ')) {
    throw new Error("Your username shouldn't have any spaces");
  }

  //check if username has more 3 4 characters
  if (username.length < 4) {
    throw new Error('Your username should be at least 4 characters');
  }

  // check if password is at least 6 characters long
  if (password.length < 6) {
    throw new Error('Your password should be at least 6 characters long');
  }

  // create a hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // create the user
  const user = await this.create({
    slug: slugify(username, { lower: true }),
    user_role,
    username,
    first_name,
    last_name,
    middle_name,
    email,
    phone_number,
    password: hash,
  });

  return user;
};

UserSchema.statics.login = async function (phone_number, password) {
  //check if pass and phone numbers exist
  if (!phone_number || !password) {
    throw new Error('All fields must be filled');
  }

  // check if phone number already exist in our system
  const user = await this.findOne({ phone_number });

  if (!user) {
    throw new Error('Incorrect phone number');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error('Incorrect password');
  }

  if (user.verified === false) {
    throw new Error('User not verified');
  }

  if (user.active === false) {
    throw new Error('User is blocked');
  }

  return user;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
