const joi = require('joi');

module.exports = {
  validateRegisterInput: async (input) => {
    const schema = joi.object({
      username: joi.string().min(3).max(30).regex(/^[a-zA-Z0-9_@.]*$/).required()
        .messages({
          'string.regex': 'Username includes letter and _ . @',
          'string.min': 'Username should have a minimum length of 3',
          'string.max': 'Username should have a max length of 30'
        }),
      password: joi.string().min(6).required(),
      confirmPassword: joi.any().valid(joi.ref('password')).required().messages({ 'any.only': 'The password confirmation does not match' }),
      email: joi.string().email().required()
    });

    const payload = await schema.validateAsync(input);
    return payload;
  },

  validateLoginInput: async (input) => {
    const schema = joi.object({
      username: joi.string().regex(/^[a-zA-Z0-9_@.]{3,30}$/).required()
        .messages({
          'string.regex': 'Invalid username'
        }),
      password: joi.string().required()
    });

    const payload = await schema.validateAsync({
      username: input.username.trim(),
      password: input.password
    });
    return payload;
  }
};
