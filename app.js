const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const transactionsRouter = require('./routes/api/transactions')

require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/', transactionsRouter)

const { DB_HOST, PORT = 3000 } = process.env

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT)
    console.log('BitLab Database connected')
    console.log('Server running on port 3000')
  })
  .catch(err => {
    console.log(err.message)
    process.exit(1)
  })

module.exports = app
