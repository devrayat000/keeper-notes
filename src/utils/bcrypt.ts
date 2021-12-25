import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS)
  const hash = await bcrypt.hash(password, salt)

  return { salt, hash }
}

export async function verifyPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash)
}
