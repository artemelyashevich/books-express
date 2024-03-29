import mysql, {Connection} from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

export const pool: Connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user:  process.env.MYSQL_USER,
  password:  process.env.MYSQL_PASSWORD,
  database:  process.env.MYSQL_NAME
})
 