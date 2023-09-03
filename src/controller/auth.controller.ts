import requestHandler from "../lib/handler";

import { UserStore } from "../database/store/users/user.store";

import { tokens } from "../services/tokens.service";

import { createUserSchema, loginSchema, otpSchema } from "../lib/schema";
import { Roles } from "../lib/types";
import ApiResponse from "../lib/api-response";
import { getFromObject } from "../lib/utils";

const register = requestHandler(async (req, res) => {
  const { email, username, password } = createUserSchema.parse(req.body);
  // const hashedPassword = ;
  const user = await UserStore.create({
    email,
    password: tokens.hash(password),
    username,
  });
  const token = tokens.sign({ uuid: user.id, role: Roles.NOT_VERIFIED });

  // Handle Mailing here

  res
    .status(201)
    .send(new ApiResponse("User created successfully", 201, { token }));
});

const verify = requestHandler(async (req, res) => {
  const { otp } = otpSchema.parse(req.body);
  // handle otp verification
  const userId = getFromObject(res, "uuid");
  console.log(userId);

  const verifiedUser = await UserStore.update(userId, {
    verified: true,
  });

  res
    .status(200)
    .send(
      new ApiResponse("User verified successfully", 200, { user: verifiedUser })
    );
});

const login = requestHandler(async (req, res) => {
  const { email, password } = loginSchema.parse(req.body);

  const user = await UserStore.get({ email: email }, [
    "password",
    "username",
    "email",
    "verified",
  ]);

  if (tokens.compare(user?.password || "", password)) {
    const token = tokens.sign({
      role: user?.verified ? Roles.VERIFIED : Roles.NOT_VERIFIED,
      uuid: user?.id,
    });

    res
      .status(200)
      .json(new ApiResponse("Logged in successfully", 200, { token }));
  } else {
    res.status(401).json(new ApiResponse("Wrong Credentials", 401, null, null));
  }
});

export const authController = {
  register,
  verify,
  login,
};
