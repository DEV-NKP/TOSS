import { NestFactory } from '@nestjs/core';
import { TossModule } from './toss.module';
import * as session from 'express-session';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
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
  app.use(cookieParser());

  app.use(cors({
    origin: 'http://localhost:8000',
    credentials: true,
  }));
  await app.listen(3000);
}
bootstrap();
