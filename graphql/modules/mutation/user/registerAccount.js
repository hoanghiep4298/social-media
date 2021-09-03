const UserModel = require('@models/User');
const { validateRegisterInput } = require('@helpers/validators');
const bcrypt = require('bcryptjs');
const { SECRET_KEY_JWT } = require('@config/authConfig');
const jwt = require('jsonwebtoken');

module.exports = async (_, args, context) => {
  const response = {
    success: false,
    message: ''
  };
  
  try {
    const payload = await validateRegisterInput(args.input);

    const existedUsername = await UserModel.findOne({ username: payload.username }).lean();
    if (existedUsername?._id) {
      response.message = 'Username already existed';
      return response;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(payload.password, salt);

    const user = await UserModel.create({
      username: payload.username,
      password: hashedPassword,
      email: payload.email
    });

    if (!user?._id) {
      response.message = 'Register failed!';
      return response;
    }

    const token = jwt.sign({
      id: user._id,
      username: user.username
    }, SECRET_KEY_JWT);
    
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
