import { Router } from "express";
import { loginUser } from "@/controllers/auth";
import {
  loginEmailValidator,
  loginPasswordValidator,
} from "@/middlewares/auth";
import { validate } from "@/middlewares/validation";
import { loginSchema } from "@/validations/auth";

const router = Router();

router.post(
  "/login",
  validate(loginSchema),
  loginEmailValidator,
  loginPasswordValidator,
  loginUser
);

export default router;
