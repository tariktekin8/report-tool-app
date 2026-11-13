import { Injectable } from '@nestjs/common';
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from './schema';

export type Db = PostgresJsDatabase<typeof schema>;

@Injectable()
export class DbService {
  private client: Db | undefined;

  // Created on first use so the app boots and tests run without DATABASE_URL.
  get db(): Db {
    if (!this.client) {
      const url = process.env.DATABASE_URL;
      if (!url) {
        throw new Error('DATABASE_URL is not set');
      }
      // prepare: false is required for Supabase's transaction-mode pooler.
      this.client = drizzle({ connection: { url, prepare: false }, schema });
    }
    return this.client;
  }
}
