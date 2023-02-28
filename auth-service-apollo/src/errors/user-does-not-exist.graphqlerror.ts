import { GraphQLError } from 'graphql';

export class UserDoesNotExistGraphQLError extends GraphQLError {
  constructor() {
    super('User does not exist', {
      extensions: {
        code: 'BAD_REQUEST',
      },    
    });
  }
} 
