
const PostModel = require('@models/Post');
module.exports = async (args, context) => {
  try {
    let posts = await PostModel.find().lean();
    posts = posts.map(item => ({
      id: item._id,
      username: item.username,
      body: item.body,
      comments: item.comments
    }));
    return posts;
  } catch (err) {
    throw new Error(err);
  }
}
