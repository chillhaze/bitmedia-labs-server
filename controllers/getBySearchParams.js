const { Transaction } = require('../models')

const getBySearchParams = async (req, res) => {
  let { filter, searchQuery } = req.query

  switch (filter) {
    case 'adress':
      filter = 'recipientsAdress'
      break
    case 'transactionId':
      filter = 'transactionId'
      break
    case 'blockNumber':
      filter = 'blockNumber'
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