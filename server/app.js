import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import { csurfProtection, userAuthValidation } from "./middlewares/jwt.js"
import { userRouter } from "./routes/userRoutes.js"
import { articleRouter } from "./routes/articleRoutes.js"
import cookieParser from "cookie-parser"

dotenv.config()

const port = process.env.PORT || 4040
const dbUri = process.env.DBURI

const app = express()

mongoose.set("strictQuery", true)
;(async () => {
  try {
    await mongoose.connect(dbUri)
    app.listen(port, () => {
      console.log(`app running at http://localhost:${port}`)
    })
  } catch (error) {
    console.log(error)
  }
})()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(csurfProtection)
app.use(cors({ origin: "http://localhost:5173", credentials: true }))

app.use(userAuthValidation)

app.use("/users", userRouter)
app.use("/articles", articleRouter)

app.get("/csurf", (req, res) => {
  res.json({ csurfProtection: req.csrfToken() })
})
