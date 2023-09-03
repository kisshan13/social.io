import { Router } from "express";
import { userController } from "../controller/user.controller";
import RoleAccess, { PathConfig } from "../middlewares/role-access.middleware";
import { Roles } from "../lib/types";

const userRouter = Router();

const accessOptions: PathConfig<Roles>[] = [
  { path: "/api/user/profile", method: "GET", role: Roles.VERIFIED },
];

const roleAccess = new RoleAccess(accessOptions, { secretKey: "kisshan99" });

userRouter.use(roleAccess.guard());

userRouter.get("/profile", userController.profile);

export default userRouter;
