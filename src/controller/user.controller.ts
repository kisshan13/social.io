import { UserStore } from "../database/store/users/user.store";
import ApiResponse from "../lib/api-response";
import requestHandler from "../lib/handler";
import { getFromObject } from "../lib/utils";

const profile = requestHandler(async (req, res) => {
  const userId = getFromObject(res, "uuid");
  const userProfile = await UserStore.genProfile({ id: userId });

  res
    .status(200)
    .json(new ApiResponse("Profile Details are", 200, { userProfile }));
});

export const userController = {
  profile,
};
