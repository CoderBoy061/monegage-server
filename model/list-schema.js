import mongoose from "mongoose";

const listSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Index for faster lookups
    },
    codeName: {
      type: String,
      required: true,
      index: true,
    },
    codeImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// export default mongoose.model("List", listSchema);

const List = mongoose.model("List", listSchema);
export default List;
