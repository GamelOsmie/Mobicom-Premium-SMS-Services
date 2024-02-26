const slugify = require('slugify');

const errorResponse = require('../../utils/errorResponse');
const Content = require('./content.models');

//POST | api/v1/contents
//ACCESS | All
const createContents = async (req, res, next) => {
  const { subject, body, publication_status, category } = req.body;
  const slug = slugify(subject, { lower: true });
  const { _id, user_role } = req.user;

  try {
    const contents = await Content.create({
      slug,
      subject,
      body,
      category,
      publication_status,
      author: _id,
      approval_status: 'approved',
    });

    res.status(201).json({
      status: 'success',
      message: 'Content successfully created',
      data: contents,
    });
  } catch (error) {
    next(errorResponse(400, error.message));
  }
};

//GET | api/v1/contents/mine
//ACCESS | User
const getMyContents = async (req, res, next) => {
  const { _id } = req.user;
  // const pageSize = 15;
  // const pageNum = parseInt(req.query.page);

  try {
    const contents = await Content.find({ author: _id })
      .populate({
        path: 'author',
        select: 'first_name last_name username',
      })
      .sort({
        updated_at: -1,
        created_at: -1,
      }).limit(400);
    // .limit(pageSize)
    // .skip(pageSize * (pageNum - 1));

    // const count = await Content.countDocuments({ author: _id });

    // const meta = paginate({ count, pageNum, pageSize, req });

    return res.status(200).json({
      status: 'success',
      message: 'Contents fetched successfully',
      data: contents,
      // meta,
    });
  } catch (error) {
    next(errorResponse(400, error.message));
  }
};

//GET | api/v1/contents/mine/:slug
//ACCESS | User
const getMyContent = async (req, res, next) => {
  const { slug } = req.params;
  const { _id } = req.user;

  try {
    const content = await Content.findOne({ author: _id, slug });

    if (!content) {
      return next(errorResponse(404, 'Content not found'));
    }

    res.status(200).json({
      status: 'success',
      message: 'Content fetched successfully',
      data: content,
    });
  } catch (error) {
    next(errorResponse(400, error.message));
  }
};

//GET | api/v1/contents
//ACCESS | Super Admin, Admin, Organization Admin
const getContents = async (req, res, next) => {
  // const pageSize = 10;
  // const pageNum = parseInt(req.query.page);

  let contents;
  // let count;

  try {
    contents = await Content.find({
      publication_status: 'published',
    })
      .populate({
        path: 'author',
        select: 'first_name last_name username',
      })
      .sort({ updated_at: -1 });
    //   .skip(pageSize * (pageNum - 1))
    //   .limit(pageSize);

    // count = await Content.countDocuments({
    //   publication_status: 'published',
    // });

    // const meta = paginate({ count, pageNum, pageSize, req });

    return res.status(200).json({
      status: 'success',
      message: 'Contents fetched successfully',
      data: contents,
      // meta,
    });
  } catch (error) {
    next(errorResponse(400, error.message));
  }
};

//GET | api/v1/contents/:slug
//ACCESS | Super Admin, Admin, Organization Admin, Organization Manager
const getContent = async (req, res, next) => {
  const { slug } = req.params;
  const { organization } = req.user;

  let content;

  try {
    if (organization) {
      content = await Content.findOne({ slug, organization }).populate({
        path: 'author',
        select: 'first_name last_name username',
      });
    } else {
      content = await Content.findOne({ slug, organization: null }).populate({
        path: 'author',
        select: 'first_name last_name username',
      });
    }

    if (!content) {
      return next(errorResponse(404, 'Content not found'));
    }

    res.status(200).json(content);
  } catch (error) {
    next(errorResponse(400, error.message));
  }
};

//PUT | api/v1/contents/mine/:slug
//ACCESS | Super Admin, Admin, Organization Admin, Organization Manager
const updateMyContent = async (req, res, next) => {
  const { slug } = req.params;
  const { subject, body, publication_status } = req.body;
  const { _id } = req.user;

  try {
    const content = await Content.findOneAndUpdate(
      { author: _id, slug },
      {
        slug: slugify(subject, { lower: true }),
        subject,
        body,
        publication_status,
      },
      { new: true },
    );

    if (!content) {
      return next(errorResponse(404, 'Content not found'));
    }

    res.status(200).json({
      status: 'success',
      message: 'Content updated successfully',
      data: content,
    });
  } catch (error) {
    next(errorResponse(400, error.message));
  }
};

//PUT | api/v1/contents/:slug
//ACCESS | Super Admin, Admin
const ApproveContent = async (req, res, next) => {
  const { slug } = req.params;
  const { approval_status } = req.body;

  try {
    const content = await Content.findOneAndUpdate(
      { slug },
      {
        approval_status,
      },
      { new: true },
    );

    if (!content) {
      return next(errorResponse(404, 'Content not found'));
    }

    return res.status(200).json({
      status: 'success',
      message: 'Approval status updated successfully',
      data: content,
    });
  } catch (error) {
    next(errorResponse(400, error.message));
  }
};

module.exports = {
  createContents,
  getMyContents,
  getMyContent,
  getContents,
  getContent,
  updateMyContent,
  ApproveContent,
};
