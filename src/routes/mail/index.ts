import { fetchMails, fetchSingleMail } from "@/controllers/mail";
import { authenticate } from "@/middlewares/auth";
import { validateQuery } from "@/middlewares/validation";
import { searchMailsSchema } from "@/validations/auth";
import { Router } from "express";

const router = Router();

router.get("/", authenticate, validateQuery(searchMailsSchema), fetchMails);
router.get("/:mailId", fetchSingleMail);
// router.get("/search", searchMails);

export default router;
