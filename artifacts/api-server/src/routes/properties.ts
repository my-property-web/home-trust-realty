import { Router, type IRouter } from "express";
import { eq, and, gte, lte } from "drizzle-orm";
import { db } from "@workspace/db";
import { propertiesTable } from "@workspace/db";
import {
  ListPropertiesQueryParams,
  GetPropertyParams,
  ListPropertiesResponse,
  GetPropertyResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/properties", async (req, res): Promise<void> => {
  const query = ListPropertiesQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  const { type, minPrice, maxPrice, bedrooms, location, featured } = query.data;

  let dbQuery = db.select().from(propertiesTable);
  const conditions = [];

  if (type && type !== "all") {
    conditions.push(eq(propertiesTable.listingType, type));
  }
  if (minPrice !== undefined) {
    conditions.push(gte(propertiesTable.price, minPrice));
  }
  if (maxPrice !== undefined) {
    conditions.push(lte(propertiesTable.price, maxPrice));
  }
  if (bedrooms !== undefined) {
    conditions.push(eq(propertiesTable.bedrooms, bedrooms));
  }
  if (location) {
    conditions.push(eq(propertiesTable.location, location));
  }
  if (featured !== undefined) {
    conditions.push(eq(propertiesTable.isFeatured, featured));
  }

  const results = conditions.length > 0
    ? await dbQuery.where(and(...conditions))
    : await dbQuery;

  const mapped = results.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description ?? undefined,
    price: p.price,
    priceLabel: p.priceLabel,
    listingType: p.listingType as "buy" | "rent",
    propertyType: p.propertyType as "apartment" | "house" | "villa" | "townhouse" | "studio" | "penthouse",
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    area: p.area,
    areaUnit: p.areaUnit,
    location: p.location,
    address: p.address ?? undefined,
    imageUrl: p.imageUrl,
    images: p.images ?? [],
    features: p.features ?? [],
    isVerified: p.isVerified,
    isFeatured: p.isFeatured,
    yearBuilt: p.yearBuilt ?? undefined,
    parking: p.parking ?? undefined,
    agentId: p.agentId ?? undefined,
  }));

  res.json(ListPropertiesResponse.parse(mapped));
});

router.get("/properties/:id", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetPropertyParams.safeParse({ id: parseInt(rawId, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [property] = await db
    .select()
    .from(propertiesTable)
    .where(eq(propertiesTable.id, params.data.id));

  if (!property) {
    res.status(404).json({ error: "Property not found" });
    return;
  }

  const mapped = {
    id: property.id,
    title: property.title,
    description: property.description ?? undefined,
    price: property.price,
    priceLabel: property.priceLabel,
    listingType: property.listingType as "buy" | "rent",
    propertyType: property.propertyType as "apartment" | "house" | "villa" | "townhouse" | "studio" | "penthouse",
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: property.area,
    areaUnit: property.areaUnit,
    location: property.location,
    address: property.address ?? undefined,
    imageUrl: property.imageUrl,
    images: property.images ?? [],
    features: property.features ?? [],
    isVerified: property.isVerified,
    isFeatured: property.isFeatured,
    yearBuilt: property.yearBuilt ?? undefined,
    parking: property.parking ?? undefined,
    agentId: property.agentId ?? undefined,
  };

  res.json(GetPropertyResponse.parse(mapped));
});

export default router;
