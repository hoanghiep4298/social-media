const { Query } = require('@graphql/resolvers/queryResolver');
const { Mutation } = require('@graphql/resolvers/mutionResolver');
const { Subscription } = require('@root/graphql/resolvers/subscriptionResolver');

const resolvers = {
  Query,
  Mutation,
  Subscription
};

module.exports = resolvers;
