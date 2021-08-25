const PostModel = require('@models/Post');
const checkAuth = require('@helpers/checkAuth');

module.exports = async (args, context) => {
  const response = {
    success: false,
    message: ''
  };

  try {
    const authInfo = checkAuth(context);

    const { body } = args.input;

    const created = await PostModel.create({
      body,
      username: authInfo.username,
      createdAt: new Date()
    });
    
    if (!created?._id) {
      return response;
    }
    
    return {
      body: created.body,
      username: created.username,
      success: true
    };
  } catch (err) {
    throw new Error(err);
  }
};
