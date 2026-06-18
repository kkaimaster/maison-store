import { Hono } from 'hono';
import { cors } from 'hono/cors';
import {
  getProductByHandle as getProductByHandleService,
  getRelatedProducts as getRelatedProductsService,
  listProducts as listProductsService,
} from './products/service';

const app = new Hono().basePath('api');

app.use(cors({ origin: '*' }));

app.get('/ping', (c) => c.json({ message: `Pong! ${Date.now()}` }));

// Product routes — only used when deployed to Cloudflare Workers.
// On Vercel (and any other static host) the Vite frontend calls
// the Shopify Storefront API directly via services/shopify.ts.
app.get('/products', async (c) => {
  const db = c.env?.DB as D1Database | undefined;
  if (!db) return c.json({ error: 'D1 binding not configured' }, 500);
  const products = await listProductsService(db);
  return c.json({ data: products });
});

app.get('/products/:handle', async (c) => {
  const db = c.env?.DB as D1Database | undefined;
  if (!db) return c.json({ error: 'D1 binding not configured' }, 500);
  const handle = c.req.param('handle');
  const product = await getProductByHandleService(db, handle);
  if (!product) return c.json({ error: 'not_found' }, 404);
  return c.json({ data: product });
});

app.get('/products/:handle/related', async (c) => {
  const db = c.env?.DB as D1Database | undefined;
  if (!db) return c.json({ error: 'D1 binding not configured' }, 500);
  const handle = c.req.param('handle');
  const related = await getRelatedProductsService(db, handle, 3);
  return c.json({ data: related });
});

export default app;
