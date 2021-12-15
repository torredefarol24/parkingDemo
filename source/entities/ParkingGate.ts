import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { DB_CONNECTION } from "../dataSource";
import { logger } from "../utility/logger";

@Entity({ tableName: "parkingGates" })
export class ParkingGateEntity {
  @PrimaryKey()
  id!: Number;

  @Property({ fieldName: "createdAt" })
  createdAt: Date = new Date();

  @Property({ fieldName: "updatedAt", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ fieldName: "gateName", nullable: false })
  gateName!: String;
}

export class ParkingGate {
  static async getModel() {
    try {
      const orm = await DB_CONNECTION;
      return orm?.em.getRepository(ParkingGateEntity);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  static async getAll() {
    try {
      const model = await ParkingGate.getModel();
      return await model?.findAll();
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  static async create(data: any) {
    try {
      const orm = await DB_CONNECTION;
      const parkingGate: any = await orm?.em.create(ParkingGateEntity, data);
      await orm?.em.persistAndFlush(parkingGate);
      return {
        parkingGate,
      };
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}
