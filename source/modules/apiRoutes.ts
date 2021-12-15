import { Router } from "express";
import { vehicleRouter } from "./vehicles";
import { parkingGateRouter } from "./parkingGate";
import { parkingRouter } from "./parking";

const router = Router();

router.use("/vehicles", vehicleRouter);
router.use("/parking-gates", parkingGateRouter);
router.use("/parkings", parkingRouter);

export default router;
