const PostModel = require('@models/Post');
const UserModel = require('@models/User');
const checkAuth = require('@helpers/checkAuth');
  
module.exports = async (args, context) => {
  let response = {
    success: false,
    message: ''
  };

  try {
    const authInfo = checkAuth(context);
    const { postId } = args;

    const user = await UserModel.findOne({ _id: authInfo.id });
    if (!user?._id) {
      response.message = 'User does not exist';
      return response;
    }

    const post = await PostModel.findById(postId).lean();
    if (!post?._id) {
      response.message = 'Post not found';
      return response;
    }

    const likeObj = post.likes?.find((item) => item.username === authInfo.username);
    if (likeObj) {
      // => unlike
      const unlike = await PostModel.findOneAndUpdate({
        _id: postId
      }, {
        $pull: {
          likes: { username: authInfo.username }
        }
      }, {
        new: true
      });

      if (unlike?.nModified === 1) response.success = true;
      response = { ...unlike._doc, id: unlike._id, success: true };
    } else {
      const like = await PostModel.findOneAndUpdate({
        _id: postId
      }, {
        $push: {
          likes: {
            username: authInfo.username,
            createdAt: new Date()
          }
        }
      }, {
        new: true
      });
  
      if (like?._id) {
        response = { ...like._doc, id: like._id, success: true };
      }
    }

    return response;
  } catch (err) {
    throw new Error(err);
  }
};
