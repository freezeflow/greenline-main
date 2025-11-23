import { config } from 'dotenv'

// config({
//     path: `.env.${process.env.NODE_ENV || 'development'}.local`
// })

config()

export const {
  MAIL_FROM,
  RESEND_KEY,
  MAIL_RECEIVE,
  BACKEND_URL
} = process.env;