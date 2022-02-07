const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const transactionsRouter = require('./routes/api/transactions')

DB_HOST =
  'mongodb+srv://alexander:mongoDB00140014@bitmediadb.dgvoh.mongodb.net/bitmed?retryWrites=true&w=majority'

require('dotenv').config()
mongoose
  .connect(DB_HOST)
  .then(() => console.log('BitLab Database connected'))
  .catch(err => {
    console.log(err.message)
    process.exit(1)
  })

const app = express()
app.use(cors())

app.get('/', transactionsRouter)

app.listen(3000, () => console.log('Server running on port 3000'))

// app.use('/api/transactions', transactionsRouter)

// app.use((req, res) => {
//   res.status(404).json({ message: 'Not found' })
// })

// app.use((err, req, res, next) => {
//   const { status = 500, message = 'Server error' } = err
//   res.status(status).json({
//     status: 'error',
//     code: status,
//     message,
//   })
// })

module.exports = app
