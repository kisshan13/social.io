import jwt from "jsonwebtoken";

import type { Request, Response, NextFunction } from "express";
import ApiResponse from "../lib/api-response";
import { addToObject, getFromObject } from "../lib/utils";
import { tokenSchema } from "../lib/schema";

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
    return (req: Request, res: Response, next: NextFunction) => {
      const { originalUrl, method } = req;
      const token = getFromObject(res, "token");
      const config = this.config.find(
        (con) => con.method === method && con.path === originalUrl
      );

      if (!config) {
        next();
        return;
      }
      if (!token) {
        const response = new ApiResponse(
          "No auth token present in header",
          401,
          null,
          null
        );
        res.status(response.statusCode).send(response);
        return;
      }

      const authTokenInfo = tokenSchema.parse(this.verify(token));
      addToObject(res, "uuid", authTokenInfo.uuid);
      if (authTokenInfo.role === config.role) {
        next();
        return;
      }

      if (this.options.cookieBased) {
        // implement cookie based authentication here...
      }

      res
        .status(403)
        .send(
          new ApiResponse(
            "Missing permission to access this endpoint",
            403,
            null,
            null
          )
        );
    };
  }

  sign(obj: Object) {
    return jwt.sign(obj, this.options.secretKey);
  }

  verify(token: string) {
    return jwt.verify(token, this.options.secretKey);
  }
}

export default RoleAccess;
