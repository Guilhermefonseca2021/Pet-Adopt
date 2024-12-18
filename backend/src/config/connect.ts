import 'dotenv/config'

export default {
    port: process.env.PORT,
    database: process.env.MONGODB_URI
}