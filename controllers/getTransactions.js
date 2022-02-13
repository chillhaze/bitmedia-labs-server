const { Transaction } = require('../models')
const { getRecentBlockNumber } = require('../services')
const hexToDecConvert = require('../utils/hexToDecConvert')

const getTransactions = async (req, res) => {
  // Pagination consts
  const { currentPage, pageItemsLimit } = req.query
  const skip = (currentPage - 1) * pageItemsLimit

  // Get Transactions total count
  const transactionsCount = await Transaction.count()

  // To prevent empty last page caused by oldest block deletion
  const count = transactionsCount - 1000

  // Get all Transactions and sort. allowDiskUse working only with paid cluster
  // const transactions = await Transaction.find({}, '', {
  //   skip,
  //   limit: Number(pageItemsLimit),
  // }).sort({ createdAt: -1 })
  // // .allowDiskUse(true)

  const transactions = await Transaction.aggregate([
    {
      $match: {},
    },
    {
      $skip: skip,
    },
    {
      $limit: Number(pageItemsLimit),
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ])

  if (!transactions) {
    const error = new Error(`Transactions not found.`)
    error.status = 404
    throw error
  }

  const recentBlockNumber = await getRecentBlockNumber()

  const result = transactions.map(item => {
    item.blockConfirmations =
      hexToDecConvert(recentBlockNumber) - item.blockNumber
    return item
  })

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
