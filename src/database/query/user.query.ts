import User from "../schema/users.schema";

interface CreateUserInterface {
  email: string;
  password: string;
  username: string;
}

const createUser = async ({
  email,
  password,
  username,
}: CreateUserInterface) => {
  return await User.create({
    email,
    password,
    username,
  });
};

export const UserStore = {
  create: createUser,
};
