import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { agentsTable } from "@workspace/db";
import { ListAgentsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/agents", async (_req, res): Promise<void> => {
  const agents = await db.select().from(agentsTable);

  const mapped = agents.map((a) => ({
    id: a.id,
    name: a.name,
    title: a.title,
    photoUrl: a.photoUrl ?? undefined,
    experience: a.experience,
    dealsCount: a.dealsCount,
    rating: a.rating,
    specializations: a.specializations ?? [],
    phone: a.phone ?? undefined,
    whatsapp: a.whatsapp ?? undefined,
    email: a.email ?? undefined,
  }));

  res.json(ListAgentsResponse.parse(mapped));
});

export default router;
