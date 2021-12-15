import path from "path";

const envOpt = {
  path: path.join(__dirname + "../../../", ".env"),
};
require("dotenv").config(envOpt);

export const SYSTEM_CONF = {
  PORT: process.env.SERVER_PORT,
};

export const DB_CONF = {
  NAME: process.env.DB_NAME,
  HOST: process.env.DB_HOST,
  PORT: Number(process.env.DB_PORT),
  USER: process.env.DB_USER,
  PASS: process.env.DB_PASS,
};

export const APP_PARAMS = {
  RATE_PER_HOUR: 10,
};
