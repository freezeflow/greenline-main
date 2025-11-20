import { config } from 'dotenv'

config({
    path: `.env.${process.env.NODE_ENV || 'development'}.local`
})

// console.log("MAIL_USER =", MAIL_USER);
// console.log("MAIL_PASS =", MAIL_PASS);
// console.log("MAIL_RECEIVE =", MAIL_RECEIVE);


export const {
  MAIL_USER,
  MAIL_PASS,
  MAIL_RECEIVE,
  BACKEND_URL
} = process.env;