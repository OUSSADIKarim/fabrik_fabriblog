import jwt from "jsonwebtoken"
import csurf from "csurf"

const { sign, verify } = jwt

export const csurfProtection = csurf({ cookie: true })

export const createToken = (userId) => {
  const authToken = sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  })
  return authToken
}

export const userAuthValidation = (req, res, next) => {
  const authToken = req.cookies["authToken"].authToken
  if (!authToken) {
    res.status(400).json("no auth for this action")
    return
  }
  const decodedToken = verify(authToken, process.env.SECRET_KEY)
  if (!decodedToken) {
    res.status(400).json("no auth for this action")
    return
  }
  res.locals.userId = decodedToken.userId
  next()
}
