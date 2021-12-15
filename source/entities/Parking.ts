import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { DB_CONNECTION } from "../dataSource";
import { calcParkingFee } from "../utility/feeCalculator";
import { logger } from "../utility/logger";

@Entity({ tableName: "parkings" })
export class ParkingEntity {
  @PrimaryKey()
  id!: Number;

  @Property({ fieldName: "vehicleId" })
  vehicleId!: Number;

  @Property({ fieldName: "parkingGateId" })
  parkingGateId!: Number;

  @Property({ fieldName: "startTime" })
  startTime: Date = new Date();

  @Property({ fieldName: "endTime", nullable: true })
  endTime!: Date;

  @Property({ fieldName: "fee", nullable: true })
  fee!: Number;
}

export class Parking {
  static async getModel() {
    try {
      const orm = await DB_CONNECTION;
      return orm?.em.getRepository(ParkingEntity);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  static async create(data: any) {
    try {
      const orm = await DB_CONNECTION;
      const model = await Parking.getModel();
      const existingParking: any = await model?.findOne({
        vehicleId: data.vehicleId,
        endTime: {
          $ne: null,
        },
      });

      if (existingParking) {
        return {
          parking: null,
          hasFailure: true,
          message: "This Vehicle is already parked",
        };
      }

      const parking: any = await orm?.em.create(ParkingEntity, data);
      await orm?.em.persistAndFlush(parking);
      return {
        parking,
        hasFailure: false,
      };
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  static async end(vehicleId: Number) {
    try {
      const orm = await DB_CONNECTION;
      const parking: any = await orm?.em.getRepository(ParkingEntity).findOne({
        vehicleId,
        endTime: {
          $eq: null,
        },
      });

      if (!parking) {
        return {
          parking: null,
          hasFailure: true,
          message: "This Vehicle is not yet parked",
        };
      }

      parking.endTime = new Date();
      parking.fee = calcParkingFee(parking.startTime, parking.endTime);
      await orm?.em.persistAndFlush(parking);
      return {
        parking,
        hasFailure: false,
      };
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}
