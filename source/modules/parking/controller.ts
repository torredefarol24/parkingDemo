import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Request, Response } from "express";
import { logger } from "../../utility/logger";
import { Parking } from "../../entities";

export async function createParking(request: Request, response: Response) {
  try {
    const parkingInfo = request.body;
    const { parking, hasFailure, message } = await Parking.create(parkingInfo);

    if (hasFailure) {
      logger.error(
        `${message}: vehicleId:${parkingInfo.vehicleId}, parkingGateId: ${parkingInfo.parkinggateId}`
      );
      return response.status(533).json({
        data: null,
        message,
      });
    }

    return response.status(StatusCodes.OK).json({
      data: parking,
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

export async function endParking(request: Request, response: Response) {
  try {
    const vehicleId = Number(request.body.vehicleId);
    const { parking, hasFailure, message } = await Parking.end(vehicleId);

    if (hasFailure) {
      logger.error(`${message}: vehicleId:${vehicleId}`);
      return response.status(535).json({
        data: null,
        message,
      });
    }

    return response.status(StatusCodes.OK).json({
      data: parking,
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
