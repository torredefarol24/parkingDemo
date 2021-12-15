import { APP_PARAMS } from "../config/env";

export function calcParkingFee(startTime: any, endTime: any) {
  const DIFF_HRS = Math.ceil((endTime - startTime) / 1000 / 60 / 60);
  return APP_PARAMS.RATE_PER_HOUR * DIFF_HRS;
}
