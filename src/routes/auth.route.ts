import { Router } from "express";
import { authController } from "../controller/auth.controller";
import RoleAccess from "../middlewares/role-access.middleware";
import { Roles } from "../lib/types";

const authRouter = Router();
const roleAccess = new RoleAccess<Roles>(
  [{ path: "/api/auth/verify", method: "POST", role: Roles.NOT_VERIFIED }],
  {
    secretKey: "kisshan99",
  }
);

authRouter.use(roleAccess.guard());

authRouter.post("/register", authController.register);
authRouter.post("/verify", authController.verify);
authRouter.post("/login", authController.login);

export default authRouter;
