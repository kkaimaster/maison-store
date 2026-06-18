import { drizzle, type DrizzleD1Database } from 'drizzle-orm/d1';
import * as schema from './schema';

export type DB = DrizzleD1Database<typeof schema>;

/**
 * Create a Drizzle handle from a D1 binding. The Cloudflare worker
 * injects the binding at runtime via the `DB` env var.
 *
 * On non-Cloudflare environments (Vercel), this is never called because
 * the worker code path is not bundled into the Vercel deploy.
 */
export const getDatabase = (binding: D1Database): DB => drizzle(binding, { schema });

/** Convenience export for the wrangler `cloudflare:workers` env. */
export const database = (binding: D1Database): DB => getDatabase(binding);
