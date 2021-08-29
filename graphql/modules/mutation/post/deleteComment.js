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
    const { postId, commentId } = args;

    const user = await UserModel.findOne({ _id: authInfo.id });
    if (!user?._id) {
      response.message = 'User does not exist';
      return response;
    }

    const deleted = await PostModel.findOneAndUpdate({
      _id: postId
    }, {
      $pull: {
        comments: { _id: commentId }
      }
    }, {
      new: true
    }).lean();

    if (!deleted?._id) {
      response.message = 'Comment failed';
      return response;
    }

    deleted.comments = deleted.comments.map((item) => ({
      id: item._id,
      ...item
    }));

    response.success = true;
    return response;
  } catch (err) {
    throw new Error(err);
  }
};
