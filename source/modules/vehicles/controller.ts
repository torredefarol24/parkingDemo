import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Request, Response } from "express";
import { logger } from "../../utility/logger";
import { Vehicle } from "../../entities";

export async function getAllVehicles(request: Request, response: Response) {
  try {
    const vehicles = await Vehicle.getAll();
    return response.status(StatusCodes.OK).json({
      data: vehicles,
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

export async function createVehicle(request: Request, response: Response) {
  try {
    const vehicleInfo = request.body;
    const { vehicle } = await Vehicle.create(vehicleInfo);
    logger.log(`Vehicle Created: vehicleId: ${vehicle.id}`);
    return response.status(StatusCodes.CREATED).json({
      data: vehicle,
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
