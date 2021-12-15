import { Router } from "express";
import { createParking, endParking } from "./controller";

const router = Router();

router.post("/", createParking);
router.patch("/end", endParking);

export default router;
