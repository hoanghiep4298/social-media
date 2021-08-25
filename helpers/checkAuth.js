const { AuthenticationError } = require('apollo-server');

const { SECRET_KEY_JWT } = require('@config/authConfig');
const jwt = require('jsonwebtoken');

module.exports = (context) => {
  const token = context.req.headers.authorization;
  if (token) {
    try {
      const user = jwt.verify(token, SECRET_KEY_JWT);
      return user;
    } catch (err) {
      throw new Error('Invalid token');
    }
  } 
  throw new Error('Authorization must be provided');
};
