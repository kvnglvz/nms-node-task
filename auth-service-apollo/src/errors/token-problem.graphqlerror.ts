import { GraphQLError } from 'graphql';

export class AuthenticationMissingGraphQLError extends GraphQLError {
  constructor() {
    super('Authentication must use Bearer.', {
      extensions: {
        code: 'FORBIDDEN',
      },    
    });
  }
} 
