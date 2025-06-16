import { Injectable } from '@nestjs/common';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { ConfigService } from '../config/config.service';
import * as schema from './schema';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';

@Injectable()
export class DatabaseService {
  private readonly db: NeonHttpDatabase<typeof schema>;

  constructor(private configService: ConfigService) {
    const sql = neon(this.configService.get('DATABASE_URL'));
    this.db = drizzle(sql, { schema });
  }

  getDb(): NeonHttpDatabase<typeof schema> {
    return this.db;
  }
}
