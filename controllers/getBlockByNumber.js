const { Transaction } = require('../models')
const { getRecentBlockNumber } = require('../services')
const hexToDecConvert = require('../utils/hexToDecConvert')

const getBlockByNumber = async (req, res) => {
  let { filter, searchQuery, currentPage, pageItemsLimit } = req.query
  console.log(filter, searchQuery, currentPage, pageItemsLimit)
  const skip = (currentPage - 1) * pageItemsLimit

  // const transactions = await Transaction.find(
  //   {
  //     blockNumber: Number(searchQuery),
  //   },
  //   '',
  //   {
  //     skip,
  //     limit: Number(pageItemsLimit),
  //   },
  // ).sort({ createdAt: -1 })

  const transactions = await Transaction.aggregate([
    {
      $match: {
        blockNumber: Number(searchQuery),
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: Number(pageItemsLimit),
    },
  ]).sort({ createdAt: -1 })

  if (!transactions) {
    const error = new Error(`Transactions not found.`)
    error.status = 404
    throw error
  }

  const count = await Transaction.count({ blockNumber: Number(searchQuery) })
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

module.exports = getBlockByNumber
