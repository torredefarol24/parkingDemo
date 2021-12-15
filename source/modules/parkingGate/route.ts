import { Router } from "express";
import { getAllParkingGates, createParkingGate } from "./controller";

const router = Router();

router.get("/", getAllParkingGates);
router.post("/", createParkingGate);

export default router;
