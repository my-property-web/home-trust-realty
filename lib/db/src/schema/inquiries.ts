import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const viewingRequestsTable = pgTable("viewing_requests", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  preferredDate: text("preferred_date").notNull(),
  preferredTime: text("preferred_time"),
  message: text("message"),
  status: text("status").notNull().default("pending"),
  referenceNumber: text("reference_number").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const valuationRequestsTable = pgTable("valuation_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  propertyType: text("property_type").notNull(),
  bedrooms: integer("bedrooms"),
  message: text("message"),
  status: text("status").notNull().default("pending"),
  referenceNumber: text("reference_number").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertViewingRequestSchema = createInsertSchema(viewingRequestsTable).omit({ id: true, createdAt: true });
export const insertValuationRequestSchema = createInsertSchema(valuationRequestsTable).omit({ id: true, createdAt: true });
export type InsertViewingRequest = z.infer<typeof insertViewingRequestSchema>;
export type InsertValuationRequest = z.infer<typeof insertValuationRequestSchema>;
