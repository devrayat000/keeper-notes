import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import AltairFastify from 'altair-fastify-plugin';
import fastifyCookie from '@fastify/cookie';
import fastifyCsrf from 'fastify-csrf';

import { AppModule } from './app.module';
import { Prisma } from './prisma';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  app.enableCors();

  await app.register(AltairFastify, {
    path: '/altair',
    baseURL: '/altair/',
    // 'endpointURL' should be the same as the mercurius 'path'
    endpointURL: '/graphql',
  });

  await app.register(fastifyCookie, {
    secret: 'my-secret', // for cookies signature
  });
  await app.register(fastifyCsrf);

  const prismaService = app.get(Prisma);
  await prismaService.enableShutdownHooks(app);

  await app.listen(3001);
}
bootstrap();
