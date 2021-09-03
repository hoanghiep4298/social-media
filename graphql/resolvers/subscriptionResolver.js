const pubsub = require('@helpers/redisPubSub');
// const { RedisPubSub } = require('graphql-redis-subscriptions');
pubsub.publish('NEW_POST', { id: '123423423', body: '2344354fdvfvsv' });

// const pubsub = new RedisPubSub();
module.exports = {
  Subscription: {
    newPost: {
      subscribe: () => pubsub.asyncIterator('NEW_POST')
    }
  }
};
