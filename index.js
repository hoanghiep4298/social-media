const { ApolloServer } = require('apollo-server');
require('module-alias/register')
const mongoose = require('mongoose');
const mongoURI = require('./config')
const schema = require('./graphql/schema')
const gql = require('graphql-tag');
const PostModel = require('./models/Post');

const server = new ApolloServer({
  schema
})

mongoose
  .connect(mongoURI.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
  })
  .then(() => {
    console.log('MongoDB connected');
    return server.listen({ port: 5000 })
  })
  .then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
  })
