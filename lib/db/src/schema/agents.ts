import { pgTable, text, serial, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const agentsTable = pgTable("agents", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  photoUrl: text("photo_url"),
  experience: integer("experience").notNull().default(0),
  dealsCount: integer("deals_count").notNull().default(0),
  rating: real("rating").notNull().default(5.0),
  specializations: text("specializations").array().default([]),
  phone: text("phone"),
  whatsapp: text("whatsapp"),
  email: text("email"),
});

export const insertAgentSchema = createInsertSchema(agentsTable).omit({ id: true });
export type InsertAgent = z.infer<typeof insertAgentSchema>;
export type Agent = typeof agentsTable.$inferSelect;
