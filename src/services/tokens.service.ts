import jwt from "jsonwebtoken";
import { Roles } from "../lib/types";

interface TokenSignInterface {
  uuid: string;
  role: Roles;
}

function signToken({ uuid, role }: TokenSignInterface) {
  return jwt.sign({ uuid, role }, "kisshan99");
}

function verifyToken(token: string) {
  return jwt.verify(token, "kisshan99");
}

export const tokens = {
  sign: signToken,
  verify: verifyToken,
};
