import User from "../../schema/users.schema";
import convertToObjectId from "../../utils/convert";
import {
  CreateUserInterface,
  UpdateUserInterface,
  UserFieldSelection,
  UserQueryInterface,
} from "./users.types";

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

const updateUser = async (id: string, data: UpdateUserInterface) => {
  return await User.findByIdAndUpdate(convertToObjectId(id), data, {
    timestamps: true,
  }).select("username bio avatar profileType verified");
};

const getUser = async (
  query: UserQueryInterface,
  select: UserFieldSelection[]
) => {
  let queryById = false;
  let queryFields = {
    ...(query.id && { _id: query.id }),
    ...(query.email && { email: query.email }),
    ...(query.username && { username: query.username }),
  };

  if (query.id) {
    queryById = true;
  }

  const user = queryById
    ? await User.findById(convertToObjectId(query.id as string)).select(select)
    : await User.findOne(queryFields).select(select);

  return user;
};

export const UserStore = {
  create: createUser,
  update: updateUser,
  get: getUser,
};
