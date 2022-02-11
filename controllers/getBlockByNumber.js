const { Transaction } = require('../models')

const getBlockByNumber = async (req, res) => {
  let { filter, searchQuery, currentPage, pageItemsLimit } = req.query
  console.log(filter, searchQuery, currentPage, pageItemsLimit)
  const skip = (currentPage - 1) * pageItemsLimit

  const result = await Transaction.find(
    {
      blockNumber: Number(searchQuery),
    },
    '',
    {
      skip,
      limit: Number(pageItemsLimit),
    },
  ).sort({ createdAt: -1 })

  if (!result) {
    const error = new Error(`Transactions not found.`)
    error.status = 404
    throw error
  }

  const count = await Transaction.count({ blockNumber: Number(searchQuery) })

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
      count,
    },
  })
}

module.exports = getBlockByNumber
