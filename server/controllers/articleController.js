import { Article } from "../models/Article.js"

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .select("_id title user")
      .populate("user")
    res.status(200).json(articles)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const getArticle = async (req, res) => {
  const { articleId } = req.params
  try {
    const article = await Article.findById(articleId)
    res.status(200).json(article)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const getUserArticles = async (req, res) => {
  const userId = res.locals.userId
  try {
    const userArticles = await Article.find({ user: userId })
    res.status(200).json(userArticles)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const getOtherUsersArticles = async (req, res) => {
  const userId = res.locals.userId
  try {
    const otherUsersArticles = await Article.find({
      user: { $ne: userId },
    })
    res.status(200).json(otherUsersArticles)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const createArticle = async (req, res) => {
  const userId = res.locals.userId
  const { title, content } = req.body
  try {
    const newArticle = await Article.create({ user: userId, title, content })
    res.status(200).json(newArticle)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const updateArticle = async (req, res) => {
  const userId = res.locals.userId
  const { articleId } = req.params
  const { title, content } = req.body
  try {
    const updatedArticle = await Article.findOneAndUpdate(
      { _id: articleId, user: userId },
      { title, content },
      { returnDocument: "after" }
    )
    res.status(200).json(updatedArticle)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const deleteArticle = async (req, res) => {
  const userId = res.locals.userId
  const { articleId } = req.params
  try {
    const deletedArticle = await Article.findOneAndRemove({
      _id: articleId,
      user: userId,
    })
    res.status(200).json(deletedArticle)
  } catch (error) {
    res.status(400).json(error)
  }
}
