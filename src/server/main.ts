import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { ServerModule } from 'src/server/server.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ServerModule,
    new FastifyAdapter()
  );
  await app.listen(3000);
}
bootstrap();
