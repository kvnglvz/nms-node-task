import { GraphQLError } from 'graphql';

export class UnauthorizedGraphQLError extends GraphQLError {
  constructor() {
    super('You are not authorized to perform this action.', {
      extensions: {
        code: 'FORBIDDEN',
      },    
    });
  }
} 
