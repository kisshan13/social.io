import { Types } from "mongoose";

function convertToObjectId(id: string) {
  console.log(id.length);
  return Types.ObjectId.createFromHexString(id);
}

export default convertToObjectId;
