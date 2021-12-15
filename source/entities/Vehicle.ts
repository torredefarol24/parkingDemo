import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { DB_CONNECTION } from "../dataSource";
import { logger } from "../utility/logger";

@Entity({ tableName: "vehicles" })
export class VehicleEntity {
  @PrimaryKey()
  id!: Number;

  @Property({ fieldName: "createdAt" })
  createdAt: Date = new Date();

  @Property({ fieldName: "updatedAt", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ nullable: false })
  name!: String;

  @Property({ fieldName: "plateNumber", nullable: false })
  plateNumber!: String;

  @Property({ fieldName: "ownerName", nullable: false })
  ownerName!: String;
}

export class Vehicle {
  static async getModel() {
    try {
      const orm = await DB_CONNECTION;
      return orm?.em.getRepository(VehicleEntity);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  static async getAll() {
    try {
      const model = await Vehicle.getModel();
      return await model?.findAll();
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  static async create(data: any) {
    try {
      const orm = await DB_CONNECTION;
      const vehicle: any = await orm?.em.create(VehicleEntity, data);
      await orm?.em.persistAndFlush(vehicle);
      return {
        vehicle,
      };
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}
