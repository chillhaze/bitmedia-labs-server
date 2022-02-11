const { Transaction } = require('../models')

const getTransactions = async (req, res) => {
  // Pagination consts
  const { currentPage, pageItemsLimit } = req.query
  const skip = (currentPage - 1) * pageItemsLimit

  const count = await Transaction.count()
  const result = await Transaction.find({}, '', {
    skip,
    limit: Number(pageItemsLimit),
  }).sort({ createdAt: -1 })

  if (!result) {
    const error = new Error(`Transactions not found.`)
    error.status = 404
    throw error
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
      count,
    },
  })
}

module.exports = getTransactions
