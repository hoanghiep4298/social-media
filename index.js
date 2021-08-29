const { ApolloServer } = require('apollo-server');
require('module-alias/register');
const mongoose = require('mongoose');
const schema = require('@graphql/schema');
const mongoURI = require('@config/mongoConfig');
const pubsub = require('@helpers/redisPubSub');

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({ req }),
  cors: {
    credentials: true,
    origin: '*'
  }
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
    return server.listen({ port: 4000 });
  })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
