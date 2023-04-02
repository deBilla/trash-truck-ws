import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as awsServerlessExpress from 'aws-serverless-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const server = express();
  app.init();
  app.getHttpAdapter().getInstance().use((req: any, res: any) => {
    return app.getHttpAdapter().getInstance().get('/', (req: any, res: any) => {
      res.send('Hello World!');
    })(req, res);
  });
  const handler = awsServerlessExpress.createServer(server);
  exports.handler = async (event: any, context: any) => {
    const result = await awsServerlessExpress.proxy(handler, event, context, 'PROMISE');
    return result;
  };
}
bootstrap();
