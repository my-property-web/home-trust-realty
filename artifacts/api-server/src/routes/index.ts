import { Router, type IRouter } from "express";
import healthRouter from "./health";
import propertiesRouter from "./properties";
import agentsRouter from "./agents";
import testimonialsRouter from "./testimonials";
import inquiriesRouter from "./inquiries";

const router: IRouter = Router();

router.use(healthRouter);
router.use(propertiesRouter);
router.use(agentsRouter);
router.use(testimonialsRouter);
router.use(inquiriesRouter);

export default router;
