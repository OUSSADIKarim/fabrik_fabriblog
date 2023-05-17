import { createToken } from "../middlewares/jwt.js"
import { User } from "../models/User.js"
import bcrypt from "bcrypt"

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const getUser = async (req, res) => {
  const { userId } = req.params
  try {
    const user = await User.findById(userId)
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const register = async (req, res) => {
  const { email, password } = req.body
  try {
    const newUser = await User.create({ email, password })
    res.status(200).json(newUser)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      res.status(400).json("user not found")
      return
    }
    const passwordCompare = await bcrypt.compare(password, user.password)
    console.log(passwordCompare)
    if (!passwordCompare) {
      res.status(400).json("incorrect password")
      return
    }
    const authToken = createToken(user._id)
    res.cookie(
      "authToken",
      { authToken },
      { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 1000 }
    )
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie("authToken")
    res.status(200).json("logout success")
  } catch (error) {
    res.status(400).json(error)
  }
}

export const updateUser = async (req, res) => {
  const { userId } = req.params
  const { email } = req.body
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { email },
      { returnDocument: "after" }
    )
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const deleteUser = async (req, res) => {
  console.log("here")
  const userId = res.locals.userId
  console.log(userId)
  try {
    const deletedUser = await User.findByIdAndDelete(userId)
    res.status(200).json(deletedUser)
  } catch (error) {
    res.status(400).json(error)
  }
}
