import { MikroORM } from "@mikro-orm/core";
import { logger } from "../utility/logger";
import { DB_CONF } from "../config";
import { VehicleEntity, ParkingGateEntity, ParkingEntity } from "../entities";

async function connectToDB() {
  try {
    const { NAME, USER, PASS, HOST, PORT } = DB_CONF;
    const ORM = await MikroORM.init({
      entities: [VehicleEntity, ParkingGateEntity, ParkingEntity],
      dbName: NAME,
      type: "mysql",
      user: USER,
      password: PASS,
      host: HOST,
      port: PORT,
    });
    logger.log("Connected To DB");

    const generator = ORM.getSchemaGenerator();
    await generator.updateSchema();
    return ORM;
  } catch (err) {
    logger.error(err);
  }
}

export const DB_CONNECTION = connectToDB();
