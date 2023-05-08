import mongoose from "mongoose"

const Schema = mongoose.Schema

const articleSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export const Article = mongoose.model("Article", articleSchema)
