import cors from "cors";
import * as bodyParser from "body-parser";
import { DB_CONNECTION } from "../dataSource";
import { API_ROUTES } from "../modules";

function setupMiddleware(app: any) {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
}

function setupRoutes(app: any) {
  app.use("/api/v1", API_ROUTES);
}

export function bootstrapApp(app: any) {
  setupMiddleware(app);
  setupRoutes(app);
  DB_CONNECTION;
}
