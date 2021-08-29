const pubsub = require('@helpers/redisPubSub');

module.exports = {
  Subscription: {
    newPost: {
      subscribe: () => pubsub.asyncIterator('NEW_POST')
    }
  }
};
