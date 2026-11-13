import { existsSync } from 'node:fs';
import { createApp } from './app';

if (existsSync('.env')) {
  process.loadEnvFile('.env');
}

async function main(): Promise<void> {
  const app = await createApp();
  await app.listen(process.env.PORT ?? 3001);
}

void main();
