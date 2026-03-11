import { pgTable, text, serial, boolean, integer, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const propertiesTable = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  priceLabel: text("price_label").notNull(),
  listingType: text("listing_type").notNull(),
  propertyType: text("property_type").notNull(),
  bedrooms: integer("bedrooms").notNull().default(0),
  bathrooms: integer("bathrooms").notNull().default(0),
  area: real("area").notNull(),
  areaUnit: text("area_unit").notNull().default("sqft"),
  location: text("location").notNull(),
  address: text("address"),
  imageUrl: text("image_url").notNull(),
  images: text("images").array().default([]),
  features: text("features").array().default([]),
  isVerified: boolean("is_verified").notNull().default(false),
  isFeatured: boolean("is_featured").notNull().default(false),
  yearBuilt: integer("year_built"),
  parking: boolean("parking").default(false),
  agentId: integer("agent_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertPropertySchema = createInsertSchema(propertiesTable).omit({ id: true, createdAt: true });
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof propertiesTable.$inferSelect;
