import mongoose from "mongoose";
export const idConverter = (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null; // Return null if invalid
  }
  return new mongoose.Types.ObjectId(id); // Convert and return ObjectId
};

export default idConverter;