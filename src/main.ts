import { NestFactory } from '@nestjs/core';
import { TossModule } from './toss.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(TossModule);
  app.use(
    session({
      secret: 'my-secret',
      resave: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 3000000
       }
    }),
  );
  await app.listen(3000);
}
bootstrap();
