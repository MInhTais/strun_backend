import { defineConfig } from 'drizzle-kit';
import 'dotenv/config'; // Make sure this is at the very top to load env vars first

export default defineConfig({
  schema: './src/database/schema/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  // Migrations for production should be run in a production environment,
  // so we're not adding specific 'prod' config here beyond the NODE_ENV check for DATABASE_URL.
  // This file will adapt based on NODE_ENV set externally.
});
