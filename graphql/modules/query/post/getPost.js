const PostModel = require('@models/Post');
const checkAuth = require('@helpers/checkAuth');

module.exports = async (_, args, context) => {
  const response = {
    success: false,
    message: ''
  };
  
  try {
    // const authInfo = checkAuth(context);

    const { id: _id } = args;
    const post = await PostModel.findOne({ _id }).lean();
    if (!post) {
      response.message = 'Search failed';
      return response;
    }

    return {
      id: post._id,
      ...post,
      likeCount: post.likes?.length,
      commentCount: post.comments?.length,
      success: true
    };
  } catch (err) {
    throw new Error(err);
  }
};

