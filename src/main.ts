import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import fastifyView from '@fastify/view';
import { join } from 'path';

async function bootstrap() {
  
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  // Ref. https://docs.nestjs.com/techniques/performance

  await app.register(require("@fastify/view"), {
    engine: { ejs: require('ejs') },
    templates: join(__dirname, '..', 'views'),
  });

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();