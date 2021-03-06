const PostModel = require('@models/Post');
const checkAuth = require('@helpers/checkAuth');

module.exports = async (_, args, context) => {
  const response = {
    success: false,
    message: ''
  };
  
  try {
    const authInfo = checkAuth(context);

    const { id: _id } = args;
    const post = await PostModel.findOne({ _id, username: authInfo.username }).lean();
    if (!post) {
      response.message = 'Search failed';
      return response;
    }

    return {
      id: post._id,
      username: post.username,
      body: post.body,
      comment: post.comment
    };
  } catch (err) {
    throw new Error(err);
  }
};

