module.exports = {
  Mutation: {
    Post: () => ({
      create: require('@graphql/modules/mutation/post/createPost'),
      delete: require('@graphql/modules/mutation/post/deletePost')
    }),
    login: require('@graphql/modules/mutation/user/login'),
    register: require('@graphql/modules/mutation/user/registerAccount')
  }
};
