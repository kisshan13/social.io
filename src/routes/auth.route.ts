import { Router } from "express";
import { authController } from "../controller/auth.controller";
import RoleAccess from "../middlewares/role-access.middleware";
import { Roles } from "../lib/types";

const authRouter = Router();
const roleAccess = new RoleAccess<Roles>(
  [{ path: "/api/login", method: "POST", role: Roles.NOT_VERIFIED }],
  {
    secretKey: "kishan99",
  }
);

authRouter.use(roleAccess.guard());

authRouter.post("/register", authController.register);

export default authRouter;
