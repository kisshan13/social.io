import requestHandler from "../lib/handler";

import { UserStore } from "../database/query/user.query";
import { createUserSchema } from "../lib/schema";
import { tokens } from "../services/tokens.service";
import { Roles } from "../lib/types";
import ApiResponse from "../lib/api-response";

const register = requestHandler(async (req, res) => {
  const { email, username, password } = createUserSchema.parse(req.body);

  const user = await UserStore.create({ email, password, username });
  const token = tokens.sign({ uuid: user.id, role: Roles.NOT_VERIFIED });

  // Handle Mailing here

  res
    .status(201)
    .send(new ApiResponse("User created successfully", 201, { token }));
});

export const authController = {
  register: register,
};
