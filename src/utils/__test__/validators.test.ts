import { ValidationError } from 'yup'
import { capitalize, signupValidator } from '../validators'

describe('Validators', () => {
  it('should capitalize first letter of word', () => {
    const randomWord = capitalize('abcd')

    expect(randomWord).toMatch(/Abcd/)
    expect(randomWord).toEqual('Abcd')
  })

  it('should throw if one item is missing', async () => {
    await expect(
      signupValidator.validate({
        email: 'test@test.com',
        name: 'Test123',
      })
    ).rejects.toThrowError(ValidationError)
  })

  it('should throw if email is invalid', async () => {
    await expect(
      signupValidator.validate({
        email: 'testXtest.com',
        name: 'Test123',
        password: 'ppooii12',
      })
    ).rejects.toThrowError(ValidationError)
  })

  it("should throw if name doesn't fit size", async () => {
    await expect(
      signupValidator.validate({
        email: 'test@test.com',
        name: 'g',
        password: 'ppooii12',
      })
    ).rejects.toThrowError(ValidationError)
  })

  it("should throw if password doesn't fit size", async () => {
    await expect(
      signupValidator.validate({
        email: 'test@test.com',
        name: 'gasasas',
        password: 'ppoo',
      })
    ).rejects.toThrowError(ValidationError)
  })

  it('should success if everything is correct', async () => {
    const info = {
      email: 'test@test.com',
      name: 'gasasas',
      password: 'ppooii12',
    }

    await expect(signupValidator.validate(info)).resolves.toEqual(
      expect.objectContaining({ ...info })
    )
  })
})
