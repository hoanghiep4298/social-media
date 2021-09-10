const UserModel = require('@models/User');
const { validateLoginInput } = require('@helpers/validators');
const { SECRET_KEY_JWT } = require('@config/authConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async (_, args) => {
  const response = {
    success: false,
    message: ''
  };
  
  try {
    const payload = await validateLoginInput(args.input);

    const user = await UserModel.findOne({ username: payload.username }).lean();
    if (!user?._id) {
      response.message = 'Username or password is incorrect';
      return response;
    }

    const checkPassword = bcrypt.compareSync(payload.password, user.password);
    if (!checkPassword) {
      response.message = 'Username or password is incorrect';
      return response;
    }

    const token = jwt.sign({
      id: user._id,
      username: user.username
    },
    SECRET_KEY_JWT,
    { expiresIn: '1h' });
    
    return {
      id: user._id,
      email: user.email,
      token,
      username: user.username,
      createdAt: user.createdAt,
      success: true
    };
  } catch (err) {
    console.log(err);
    response.message = err.message;
    return response;
  }
};
