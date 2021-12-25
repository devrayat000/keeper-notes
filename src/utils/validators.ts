import * as yup from 'yup'
import { MessageParams } from 'yup/lib/types'

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function requiredMsg(params: MessageParams) {
  return `${capitalize(params.label)} is required`
}

export const signupValidator = yup.object().shape({
  email: yup.string().email('Invalid email').required(),
  name: yup.string().required().min(2).max(32),
  password: yup.string().required().min(8).max(32),
})
