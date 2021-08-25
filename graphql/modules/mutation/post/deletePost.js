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
    const { id: _id } = args;

    const user = await UserModel.findOne({ _id: authInfo.id });
    if (!user?._id) {
      response.message = 'User does not exist';
      return response;
    }

    const deleted = await PostModel.deleteOne({ _id, username: authInfo.username });
    if (!deleted || deleted.deletedCount < 1) {
      response.message = 'Delete failed';
      return response;
    }
    
    response.success = true;
    response.message = 'Successfully';
    return response;
  } catch (err) {
    throw new Error(err);
  }
};
