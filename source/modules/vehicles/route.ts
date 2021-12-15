import { Router } from "express";
import { createVehicle, getAllVehicles } from "./controller";

const router = Router();

router.get("/", getAllVehicles);
router.post("/", createVehicle);

export default router;
