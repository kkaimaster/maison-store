import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/**
 * MAISON — local D1 schema. Used by the Cloudflare Worker fallback
 * (`src/api/products/service.ts`). The Vercel deployment reads from
 * Shopify directly via the Storefront API client and never touches
 * this database.
 */

export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  handle: text('handle').notNull().unique(),
  title: text('title').notNull(),
  priceCents: integer('price_cents').notNull(),
  compareAtPriceCents: integer('compare_at_price_cents'),
  category: text('category').notNull(),
  description: text('description').notNull(),
  materials: text('materials').notNull(),
  shipping: text('shipping').notNull(),
  inStock: integer('in_stock').notNull(),
  isNew: integer('is_new').notNull(),
  isSale: integer('is_sale').notNull(),
  tagsCsv: text('tags_csv').notNull(),
});

export const productImages = sqliteTable('product_images', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productId: text('product_id').notNull(),
  imageUrl: text('image_url').notNull(),
  sortOrder: integer('sort_order').notNull(),
});

export const productColors = sqliteTable('product_colors', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productId: text('product_id').notNull(),
  name: text('name').notNull(),
  hex: text('hex').notNull(),
  sortOrder: integer('sort_order').notNull(),
});

export const productSizes = sqliteTable('product_sizes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productId: text('product_id').notNull(),
  size: text('size').notNull(),
  sortOrder: integer('sort_order').notNull(),
});
