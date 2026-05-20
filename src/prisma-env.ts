import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export function readDatabaseUrl(servicePath: string): string {
  const envPath = join(process.cwd(), servicePath, '.env');
  const envFile = readFileSync(envPath, 'utf8');
  const match = envFile.match(/^DATABASE_URL=(.*)$/m);

  if (!match?.[1]) {
    throw new Error(`DATABASE_URL not found in ${envPath}`);
  }

  return match[1].trim().replace(/^['"]|['"]$/g, '');
}
