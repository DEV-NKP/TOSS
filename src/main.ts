import { NestFactory } from '@nestjs/core';
import { TossModule } from './toss.module';

async function bootstrap() {
  const app = await NestFactory.create(TossModule);

  await app.listen(3000);
}
bootstrap();
