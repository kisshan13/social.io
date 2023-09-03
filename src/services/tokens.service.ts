import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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

function hash(password: string) {
  return bcrypt.hashSync(password, 10);
}

function compareHash(databasePassword: string, password: string) {
  return bcrypt.compareSync(password, databasePassword);
}

export const tokens = {
  sign: signToken,
  verify: verifyToken,
  hash: hash,
  compare: compareHash,
};
