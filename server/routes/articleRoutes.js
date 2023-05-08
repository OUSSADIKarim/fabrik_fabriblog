import express from "express"
import {
  createArticle,
  deleteArticle,
  getArticle,
  getArticles,
  getOtherUsersArticles,
  getUserArticles,
  updateArticle,
} from "../controllers/articleController.js"
import { userAuthValidation } from "../middlewares/jwt.js"

export const articleRouter = express.Router()

articleRouter.get("/all-articles", getArticles)
articleRouter.get("/", userAuthValidation, getUserArticles)
articleRouter.get("/other", userAuthValidation, getOtherUsersArticles)
articleRouter.get("/:articleId", userAuthValidation, getArticle)
articleRouter.post("/", userAuthValidation, createArticle)
articleRouter.put("/:articleId", userAuthValidation, updateArticle)
articleRouter.delete("/:articleId", userAuthValidation, deleteArticle)
