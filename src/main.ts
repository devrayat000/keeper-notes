import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { Prisma } from './prisma';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const prismaService = app.get(Prisma);
  await prismaService.enableShutdownHooks(app);

  await app.listen(3000);
}
bootstrap();
