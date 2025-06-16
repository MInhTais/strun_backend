import { neon } from '@neondatabase/serverless';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import { Pool } from 'pg';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { ConfigService } from '../config/config.service';

const configService = new ConfigService();
const dbUrl = configService.get('DATABASE_URL');

const isServerless =
  dbUrl.includes('neon.tech') || process.env.NODE_ENV === 'production';

export const db = isServerless
  ? drizzleNeon(neon(dbUrl), { schema })
  : drizzlePg(new Pool({ connectionString: dbUrl }), { schema });
