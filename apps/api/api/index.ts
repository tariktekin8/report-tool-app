import type { IncomingMessage, ServerResponse } from 'node:http';
import { createApp } from '../src/app';

type RequestListener = (req: IncomingMessage, res: ServerResponse) => void;

// Cached across warm invocations; Nest bootstraps once per function instance.
let listener: Promise<RequestListener> | undefined;

async function bootstrap(): Promise<RequestListener> {
  const app = await createApp();
  await app.init();
  return app.getHttpAdapter().getInstance() as RequestListener;
}

export default async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  listener ??= bootstrap();
  (await listener)(req, res);
}
