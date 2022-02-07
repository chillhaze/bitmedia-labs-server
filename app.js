const express = require('express')
// const mongoose = require('mongoose')
const cors = require('cors')
const logger = require('morgan')

const transactionsRouter = require('./routes/api/transactions')

require('dotenv').config()

const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

// Routs
app.use('/api', transactionsRouter)

// const { DB_HOST, PORT = 3000 } = process.env

// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     app.listen(PORT)
//     console.log('BitLab Database connected')
//     console.log('Server running on port 3000')
//   })
//   .catch(err => {
//     console.log(err.message)
//     process.exit(1)
//   })

// app.use((req, res) => {
//   res.status(404).json({ message: 'Nothing found.' })
// })

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({
    status: 'error',
    code: status,
    message,
  })
})

module.exports = app
