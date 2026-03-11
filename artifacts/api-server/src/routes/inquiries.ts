import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { viewingRequestsTable, valuationRequestsTable } from "@workspace/db";
import { BookViewingBody, RequestValuationBody } from "@workspace/api-zod";

const router: IRouter = Router();

function generateRef(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
}

router.post("/inquiries/viewing", async (req, res): Promise<void> => {
  const parsed = BookViewingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const referenceNumber = generateRef("VIEW");

  const [record] = await db
    .insert(viewingRequestsTable)
    .values({
      propertyId: parsed.data.propertyId,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      preferredDate: parsed.data.preferredDate,
      preferredTime: parsed.data.preferredTime ?? null,
      message: parsed.data.message ?? null,
      status: "pending",
      referenceNumber,
    })
    .returning();

  res.status(201).json({
    id: record.id,
    status: record.status,
    message: "Your viewing request has been received. Our agent will contact you shortly to confirm.",
    referenceNumber: record.referenceNumber,
  });
});

router.post("/inquiries/valuation", async (req, res): Promise<void> => {
  const parsed = RequestValuationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const referenceNumber = generateRef("VAL");

  const [record] = await db
    .insert(valuationRequestsTable)
    .values({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      address: parsed.data.address,
      propertyType: parsed.data.propertyType,
      bedrooms: parsed.data.bedrooms ?? null,
      message: parsed.data.message ?? null,
      status: "pending",
      referenceNumber,
    })
    .returning();

  res.status(201).json({
    id: record.id,
    status: record.status,
    message: "Thank you! Our expert valuers will reach out within 24 hours for your free property valuation.",
    referenceNumber: record.referenceNumber,
  });
});

export default router;
