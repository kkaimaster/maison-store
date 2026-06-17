import { and, eq, inArray, ne } from 'drizzle-orm';
import type { Product } from '../../shared/product';
import { getDatabase } from '../database';
import { productColors, productImages, products, productSizes } from '../database/schema';
import { seedProducts } from './seedData';

const toPriceCents = (value: number) => Math.round(value * 100);
const fromPriceCents = (value: number) => value / 100;

async function ensureSchema(db: D1Database): Promise<void> {
  const statements = [
    `CREATE TABLE IF NOT EXISTS products (id TEXT PRIMARY KEY, handle TEXT NOT NULL UNIQUE, title TEXT NOT NULL, price_cents INTEGER NOT NULL, compare_at_price_cents INTEGER, category TEXT NOT NULL, description TEXT NOT NULL, materials TEXT NOT NULL, shipping TEXT NOT NULL, in_stock INTEGER NOT NULL, is_new INTEGER NOT NULL, is_sale INTEGER NOT NULL, tags_csv TEXT NOT NULL)`,
    `CREATE TABLE IF NOT EXISTS product_images (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id TEXT NOT NULL, image_url TEXT NOT NULL, sort_order INTEGER NOT NULL)`,
    `CREATE TABLE IF NOT EXISTS product_colors (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id TEXT NOT NULL, name TEXT NOT NULL, hex TEXT NOT NULL, sort_order INTEGER NOT NULL)`,
    `CREATE TABLE IF NOT EXISTS product_sizes (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id TEXT NOT NULL, size TEXT NOT NULL, sort_order INTEGER NOT NULL)`
  ];

  for (const statement of statements) {
    await db.prepare(statement).run();
  }
}
async function mapProducts(db: ReturnType<typeof getDatabase>, rows: typeof products.$inferSelect[]): Promise<Product[]> {
  if (rows.length === 0) return [];
  const ids = rows.map((row) => row.id);

  const [images, colors, sizes] = await Promise.all([
    db.select().from(productImages).where(inArray(productImages.productId, ids)),
    db.select().from(productColors).where(inArray(productColors.productId, ids)),
    db.select().from(productSizes).where(inArray(productSizes.productId, ids))
  ]);

  return rows.map((row) => ({
    id: row.id,
    handle: row.handle,
    title: row.title,
    price: fromPriceCents(row.priceCents),
    compareAtPrice: row.compareAtPriceCents == null ? undefined : fromPriceCents(row.compareAtPriceCents),
    category: row.category as Product['category'],
    description: row.description,
    materials: row.materials,
    shipping: row.shipping,
    images: images.filter((item) => item.productId === row.id).sort((a, b) => a.sortOrder - b.sortOrder).map((item) => item.imageUrl),
    colors: colors.filter((item) => item.productId === row.id).sort((a, b) => a.sortOrder - b.sortOrder).map((item) => ({ name: item.name, hex: item.hex })),
    sizes: sizes.filter((item) => item.productId === row.id).sort((a, b) => a.sortOrder - b.sortOrder).map((item) => item.size),
    inStock: row.inStock,
    isNew: row.isNew,
    isSale: row.isSale,
    tags: row.tagsCsv.split(',').filter(Boolean)
  }));
}

export async function seedCatalog(dbBinding: D1Database): Promise<{ inserted: number; alreadySeeded: boolean }> {
  await ensureSchema(dbBinding);
  const db = getDatabase(dbBinding);
  const existing = await db.select({ id: products.id }).from(products).limit(1);
  if (existing.length > 0) {
    return { inserted: 0, alreadySeeded: true };
  }

  for (const product of seedProducts) {
    await db.insert(products).values({
      id: product.id,
      handle: product.handle,
      title: product.title,
      priceCents: toPriceCents(product.price),
      compareAtPriceCents: product.compareAtPrice == null ? null : toPriceCents(product.compareAtPrice),
      category: product.category,
      description: product.description,
      materials: product.materials,
      shipping: product.shipping,
      inStock: product.inStock,
      isNew: product.isNew,
      isSale: product.isSale,
      tagsCsv: product.tags.join(',')
    });
    await db.insert(productImages).values(product.images.map((imageUrl, index) => ({ productId: product.id, imageUrl, sortOrder: index })));
    await db.insert(productColors).values(product.colors.map((color, index) => ({ productId: product.id, name: color.name, hex: color.hex, sortOrder: index })));
    await db.insert(productSizes).values(product.sizes.map((size, index) => ({ productId: product.id, size, sortOrder: index })));
  }

  return { inserted: seedProducts.length, alreadySeeded: false };
}

async function ensureSeeded(dbBinding: D1Database): Promise<void> {
  const seeded = await seedCatalog(dbBinding);
  if (seeded.alreadySeeded) return;
}

export async function listProducts(dbBinding: D1Database): Promise<Product[]> {
  await ensureSeeded(dbBinding);
  const db = getDatabase(dbBinding);
  const rows = await db.select().from(products);
  return mapProducts(db, rows);
}

export async function getProductByHandle(dbBinding: D1Database, handle: string): Promise<Product | null> {
  await ensureSeeded(dbBinding);
  const db = getDatabase(dbBinding);
  const rows = await db.select().from(products).where(eq(products.handle, handle));
  const mapped = await mapProducts(db, rows);
  return mapped[0] ?? null;
}

export async function getRelatedProducts(dbBinding: D1Database, handle: string, count = 3): Promise<Product[]> {
  const db = getDatabase(dbBinding);
  const current = await getProductByHandle(dbBinding, handle);
  if (!current) return [];

  const sameCategoryRows = await db.select().from(products).where(and(eq(products.category, current.category), ne(products.id, current.id)));
  if (sameCategoryRows.length >= count) return (await mapProducts(db, sameCategoryRows)).slice(0, count);

  const fallbackRows = await db.select().from(products).where(ne(products.id, current.id));
  return (await mapProducts(db, fallbackRows)).slice(0, count);
}

