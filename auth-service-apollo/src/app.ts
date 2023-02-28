import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import initializeConfig, { Config } from './config.js';
import makeTokenRepository from './repository/index.js';
import initializeRedis from './repository/redis.client.js';
import { typeDefs, resolvers } from '../schema/index.js';
import authContext from './context/auth.context.js';
import makeRabbitMqConnection, { makeRegisterEmailQueue } from './producers/index.js';

// initialization steps
initializeConfig();
await initializeRedis();
await makeTokenRepository();
await makeRabbitMqConnection();
await makeRegisterEmailQueue();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: Config.port },
  context: async ({ req, res }) => await authContext(req, res),
});

console.log(`🚀  Server ready at: ${url}`);
