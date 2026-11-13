import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import type { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/all-exceptions.filter';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  // No WEB_ORIGIN means no cross-origin access at all, never "*".
  app.enableCors({ origin: process.env.WEB_ORIGIN ?? false });
  app.useGlobalFilters(new AllExceptionsFilter());
  return app;
}
