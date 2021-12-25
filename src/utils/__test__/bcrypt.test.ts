import { hashPassword, verifyPassword } from '../bcrypt'

describe('Password Hashing', () => {
  it('should hash a password and return hash and salt', async () => {
    await expect(hashPassword('ppooii12')).resolves.toEqual(
      expect.objectContaining({
        hash: expect.any(String),
        salt: expect.any(String),
      })
    )
  })

  it('should verify the hashed password', async () => {
    const password = 'testtest123'
    const { hash } = await hashPassword(password)

    await expect(verifyPassword(password, hash)).resolves.toEqual(true)
  })
})
