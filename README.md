# Node test app
## Create GraphQl API with the following functionality:
### Mutations
- Registration (email, password)
- Login (email, password)
- updateProfile(email, password, username)
### Query
- Me (email, username)

---

- Authorization should work by Bearer token header.
- Tokens must have TTL.
- Use Redis to store tokens.
- After registration, the user should receive an email.
- The email should be sent by the separate process.
- The process must receive an events about registrations through RabbitMQ.

The task should be implemented using the next technologies:
1. NodeJS (Apollo server)
2. MySQL
3. Redis (for save )
4. RabbitMQ
5. Docker

## How to run
1. run `docker-compose up -d`
2. open apollo server at http://localhost:3000

> .env's included, it is bad practice to include it though