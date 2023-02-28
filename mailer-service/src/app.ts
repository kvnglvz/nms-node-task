import express, { Express, Request, Response } from 'express';
import initializeConfig, { Config } from './config.js';
import makeRabbitMqConnection, { makeRegisterEmailQueue } from './consumers/index.js';
import makeUserCreatedConsumer from './consumers/user-created.consumer.js';
 
initializeConfig();
await makeRabbitMqConnection();
await makeRegisterEmailQueue();
await makeUserCreatedConsumer();

const app: Express = express();
const port = Config.port;

app.get('/', (req: Request, res: Response) => {
  res.send('Mailer');
});

app.listen(port, () => {
  console.log(`🚀  Server ready at: http://localhost:${Config.port}`);
});
