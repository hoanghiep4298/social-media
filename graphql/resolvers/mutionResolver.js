module.exports = {
  Mutation: {
    Post: () => ({
      createPost: require('@graphql/modules/mutation/post/createPost'),
      deletePost: require('@graphql/modules/mutation/post/deletePost'),
      createComment: require('@graphql/modules/mutation/post/createComment'),
      deleteComment: require('@graphql/modules/mutation/post/deleteComment'),
      likePost: require('@graphql/modules/mutation/post/likePost')
    }),
    login: require('@graphql/modules/mutation/user/login'),
    register: require('@graphql/modules/mutation/user/registerAccount')
  }
};
