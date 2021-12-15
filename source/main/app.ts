import express from "express";
import { bootstrapApp } from "./bootstrap";
import { logger } from "../utility/logger";
import { SYSTEM_CONF } from "../config";

export class ParkingSystem {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.bootstrap(this.app);
  }

  private bootstrap(app: any) {
    bootstrapApp(app);
  }

  public startServer() {
    this.app.listen(SYSTEM_CONF.PORT);
    logger.log(`Server Running on port ${SYSTEM_CONF.PORT}`);
  }
}
