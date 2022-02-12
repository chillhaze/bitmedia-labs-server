const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const { getRecentBlockRecursion, deleteAllTransactions } = require('./services')

const transactionsRouter = require('./routes/api/transactions')

require('dotenv').config()

const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

// Function to delete all transactions in collection
// deleteAllTransactions()

// Start load DB with getRecentBlockRecursion func
// getRecentBlockRecursion()

// Routes
app.use('/api/transactions', transactionsRouter)
console.log(process.env)

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({
    status: 'error',
    code: status,
    message,
  })
})

module.exports = app
