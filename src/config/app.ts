import {
  json,
  urlencoded,
  NextFunction,
  Request,
  Response,
  Express,
} from "express";
import cors from "cors";
import helmet from "helmet";
import apiRoutes from "../routes";
import { CustomError } from "@/types/utils";
import { handleError } from "@/utils/errorHandler";

const appConfig = (app: Express) => {
  app.use(helmet());
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use("/api", apiRoutes);
  app.use(
    (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
      handleError(err, res);
    }
  );
};

export default appConfig;
