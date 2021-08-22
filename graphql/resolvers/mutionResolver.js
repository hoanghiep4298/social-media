module.exports = {
  Mutation: {
    Post: () => ({
      Create: require('@graphql/modules/mution/post/createPost')
    })
  }
}