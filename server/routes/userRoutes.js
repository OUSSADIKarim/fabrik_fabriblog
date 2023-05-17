import express from "express"
import {
  register,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  login,
  logout,
} from "../controllers/userController.js"
import { userAuthValidation } from "../middlewares/jwt.js"

export const userRouter = express.Router()

userRouter.get("/", getUsers)
userRouter.get("/:userId", getUser)
userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.delete("/logout", logout)
userRouter.patch("/:userId", userAuthValidation, updateUser)
userRouter.delete("/:userId", userAuthValidation, deleteUser)
