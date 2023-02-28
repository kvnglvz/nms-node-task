import { GraphQLError } from 'graphql';

export class InvalidCredentialsGraphQLError extends GraphQLError {
  constructor() {
    super('Credentials might be invalid.', {
      extensions: {
        code: 'BAD_REQUEST',
      },    
    });
  }
} 
