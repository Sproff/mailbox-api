import { Router } from "express";
import authRoute from "./auth";
import mailRoute from "./mail";

const router = Router();

router.use("/auth", authRoute);
router.use("/mail", mailRoute);

export default router;
