const { Transaction } = require('../models')
const { getRecentBlockNumber } = require('../services')
const hexToDecConvert = require('../utils/hexToDecConvert')

const getBySearchParams = async (req, res) => {
  let { filter, searchQuery } = req.query

  switch (filter) {
    case 'adress':
      filter = 'recipientsAdress'
      break
    case 'transactionId':
      filter = 'transactionId'
      break

    default:
      break
  }

  const searchedElement = await Transaction.findOne({
    filter: searchQuery,
  })
    .where(filter)
    .equals(searchQuery)

  if (!searchedElement) {
    const error = new Error(
      `Transaction with filter=${filter} and search query=${searchQuery} not found.`,
    )
    error.status = 404
    throw error
  }

  const recentBlockNumber = await getRecentBlockNumber()
  searchedElement.blockConfirmations =
    hexToDecConvert(recentBlockNumber) - searchedElement.blockNumber
  const result = [searchedElement]
  const count = result.length

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
      count,
    },
  })
}

module.exports = getBySearchParams
