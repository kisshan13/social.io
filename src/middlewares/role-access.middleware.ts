import jwt from "jsonwebtoken";

import type { Request, Response, NextFunction } from "express";

type HttpMethods = "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS" | "PATCH";

interface PathConfig<T> {
  path: string;
  role: T;
  method: HttpMethods;
}

interface AccessOptions {
  secretKey: string;
  cookieBased?: boolean;
}

class RoleAccess<T> {
  config: PathConfig<T>[];
  options: AccessOptions;
  constructor(config: PathConfig<T>[], options: AccessOptions) {
    this.config = config;
    this.options = options;
  }

  guard() {
    return (req: Request, res: Response, next: NextFunction) => {};
  }

  sign(obj: Object) {
    return jwt.sign(obj, this.options.secretKey);
  }

  verify(token: string) {
    return jwt.verify(token, this.options.secretKey);
  }
}

export default RoleAccess;
