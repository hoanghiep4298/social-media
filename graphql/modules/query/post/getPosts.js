const PostModel = require('@models/Post');
const checkAuth = require('@helpers/checkAuth');

module.exports = async (_, __, context) => {
  const response = {
    success: false,
    message: ''
  };
  
  try {
    // const authInfo = checkAuth(context);
    const authInfo = { username: 'hiep123' };

    let posts = await PostModel.find({ username: authInfo.username }).sort({ createdAt: -1 }).lean();
    if (!posts) {
      response.message = 'Search failed';
      return response;
    }

    posts = posts.map((item) => ({
      id: item._id,
      username: item.username,
      body: item.body,
      comments: item.comments.map((cmt) => ({
        id: cmt._id,
        ...cmt
      })),
      likeCount: item.likes?.length,
      commentCount: item.comments?.length,
      createdAt: item.createdAt
    }));
    
    return posts;
  } catch (err) {
    throw new Error(err);
  }
};

