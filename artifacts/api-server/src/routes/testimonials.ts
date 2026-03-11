import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { testimonialsTable } from "@workspace/db";
import { ListTestimonialsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/testimonials", async (_req, res): Promise<void> => {
  const testimonials = await db.select().from(testimonialsTable);

  const mapped = testimonials.map((t) => ({
    id: t.id,
    clientName: t.clientName,
    clientPhotoUrl: t.clientPhotoUrl ?? undefined,
    rating: t.rating,
    comment: t.comment,
    transactionType: t.transactionType as "bought" | "sold" | "rented",
    propertyType: t.propertyType ?? undefined,
    date: t.date,
  }));

  res.json(ListTestimonialsResponse.parse(mapped));
});

export default router;
