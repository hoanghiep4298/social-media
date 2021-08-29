const PostModel = require('@models/Post');
const UserModel = require('@models/User');
const checkAuth = require('@helpers/checkAuth');
  
module.exports = async (args, context) => {
  const response = {
    success: false,
    message: ''
  };

  try {
    const authInfo = checkAuth(context);
    const { postId, body } = args;

    const user = await UserModel.findOne({ _id: authInfo.id });
    if (!user?._id) {
      response.message = 'User does not exist';
      return response;
    }

    const created = await PostModel.findOneAndUpdate({
      _id: postId
    }, {
      $push: {
        comments: {
          body,
          username: authInfo.username,
          createdAt: new Date()
        }
      }
    }, {
      new: true
    }).lean();

    if (!created?._id) {
      response.message = 'Comment failed';
      return response;
    }

    created.comments = created.comments.map((item) => ({
      id: item._id,
      ...item
    }));

    return {
      id: created._id,
      ...created,
      success: true
    };
  } catch (err) {
    throw new Error(err);
  }
};
