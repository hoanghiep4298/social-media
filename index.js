const { ApolloServer } = require('apollo-server');
require('module-alias/register');
const mongoose = require('mongoose');
const schema = require('@graphql/schema');
const mongoURI = require('@config/mongoConfig');

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({ req })
});

mongoose
  .connect(mongoURI.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('MongoDB connected');
    return server.listen({ port: 5000 });
  })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
