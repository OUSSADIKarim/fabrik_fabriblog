import axios from "axios"

const baseUri = import.meta.env.VITE_BASEURI
const api = axios.create({
  baseURL: baseUri,
  withCredentials: true,
})

export const getCsrf = async () => {
  const result = await api.get(`/csurf`)
  return result.data.csurfProtection
}

export const getAllArticles = async () => {
  const result = await api.get(`/articles/all-articles`)
  return result.data
}

export const register = async (email, password, csrf) => {
  const result = await api.post(
    `/users/register`,
    { email, password },
    { headers: { "X-CSRF-Token": csrf } }
  )
  return result.data
}
