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
      const unlike = await PostModel.updateOne({
        _id: postId
      }, {
        $pull: {
          likes: { username: authInfo.username }
        }
      });

      if (unlike?.nModified === 1) response.success = true;
      return response;
    }
    
    const like = await PostModel.updateOne({
      _id: postId
    }, {
      $push: {
        likes: {
          username: authInfo.username,
          createdAt: new Date()
        }
      }
    });
    
    if (like?.nModified === 1) response.success = true;
    return response;
  } catch (err) {
    throw new Error(err);
  }
};
