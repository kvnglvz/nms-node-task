import { UnauthorizedGraphQLError } from '../src/errors/unauthorized.graphqlerror.js';
import { usersDb } from '../src/repository/index.js';
import createUserService from '../src/services/create-user.service.js';
import getUserService from '../src/services/get-user.service.js';
import loginUserService from '../src/services/login-user.service.js';
import updateUserService from '../src/services/update-user.service.js';

const typeDefs = `#graphql
  scalar DateTime

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    salt: String!
  }

  type BasicUserInfo {
    id: ID
    username: String
    email: String
  }

  type LoginWithToken {
    id: ID
    username: String
    email: String
    accessToken: String
    expiration: DateTime!
  }

  type Token {
    accessToken: String!
    expiration: DateTime!
  }

  type Query {
    me: BasicUserInfo!
    users: [User]
  }

  input CreateUserInput {
    email: String!
    username: String!
    password: String!
  }

  input UpdateUserInput {
    email: String
    username: String
    password: String
  }

  input LoginUserInput {
    email: String!,
    password: String!,
  }
  
  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(input: UpdateUserInput!): BasicUserInfo
    loginUser(input: LoginUserInput!): LoginWithToken 
  } 
`;

const resolvers = {
  Query: {
    me: (_, __, context) => {
      if (!context.user ) throw new UnauthorizedGraphQLError();
      return getUserService(context.user);
    },
    users: () => usersDb.findMany() 
  },

  Mutation: {
    createUser: (_, { input }) => createUserService(input),
    updateUser: (_, { input }, { user }) => updateUserService(user.id, input),
    loginUser: (_, { input }) => loginUserService(input),
  }
};

export {
  typeDefs,
  resolvers,
};