import bcrypt from "bcrypt"

export const hashPassword = async (password) => {
  const salt = bcrypt.genSaltSync(10)
  try {
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  } catch (error) {
    throw error
  }
}
