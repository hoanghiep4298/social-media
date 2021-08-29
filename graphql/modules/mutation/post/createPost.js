const PostModel = require('@models/Post');
const checkAuth = require('@helpers/checkAuth');
const pubsub = require('@helpers/redisPubSub');

module.exports = async (args, context) => {
  const response = {
    success: false,
    message: ''
  };

  try {
    const authInfo = checkAuth(context);

    const { body } = args.input;

    const newPost = await PostModel.create({
      body,
      username: authInfo.username,
      createdAt: new Date()
    });
    
    if (!newPost?._id) {
      return response;
    }
    
    pubsub.publish('NEW_POST', { newPost });

    return {
      body: newPost.body,
      username: newPost.username,
      success: true
    };
  } catch (err) {
    throw new Error(err);
  }
};
