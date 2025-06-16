import { z } from 'zod';
import { config as loadEnv } from 'dotenv';
import * as path from 'path';

// Load đúng file env theo NODE_ENV
const envFile =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
loadEnv({ path: path.resolve(process.cwd(), envFile) });

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.string().default('3000'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
});

console.log('envFile: ', envFile);
console.log('NODE_ENV', process.env.NODE_ENV);
console.log('PORT: ', process.env.PORT);
export type EnvConfig = z.infer<typeof envSchema>;

export class ConfigService {
  private readonly config: EnvConfig;

  constructor() {
    this.config = envSchema.parse(process.env);
  }

  get<T extends keyof EnvConfig>(key: T): EnvConfig[T] {
    return this.config[key];
  }

  get isDevelopment(): boolean {
    return this.config.NODE_ENV === 'development';
  }

  get isProduction(): boolean {
    return this.config.NODE_ENV === 'production';
  }

  get isTest(): boolean {
    return this.config.NODE_ENV === 'test';
  }
}
