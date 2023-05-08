import mongoose from "mongoose"
import Email from "mongoose-type-email"
import { hashPassword } from "./../utils/hashPassword.js"

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

userSchema.pre("save", async function (next) {
  try {
    const hashedPassword = await hashPassword(this.password)
    this.password = hashedPassword
    next()
  } catch (error) {
    next(error)
  }
})

export const User = mongoose.model("User", userSchema)
