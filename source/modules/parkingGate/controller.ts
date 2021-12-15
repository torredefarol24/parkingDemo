import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Request, Response } from "express";
import { logger } from "../../utility/logger";
import { ParkingGate } from "../../entities";

export async function getAllParkingGates(request: Request, response: Response) {
  try {
    const parkingGates = await ParkingGate.getAll();
    return response.status(StatusCodes.OK).json({
      data: parkingGates,
      message: ReasonPhrases.OK,
    });
  } catch (err) {
    logger.error(err);
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
}

export async function createParkingGate(request: Request, response: Response) {
  try {
    const parkingGateInfo = request.body;
    const { parkingGate } = await ParkingGate.create(parkingGateInfo);
    logger.log(`ParkingGate Created: parkingGateId: ${parkingGate.id}`);
    return response.status(StatusCodes.CREATED).json({
      data: parkingGate,
      message: ReasonPhrases.CREATED,
    });
  } catch (err) {
    logger.error(err);
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
}
