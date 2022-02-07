const transactions = require('./transactions')

const getTransactionByIdController = async (req, res) => {
  const { id } = req.params
  console.log(transactions)
  const result = transactions.find(item => {
    return item.id.toString() === id
  })

  if (!result) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Transaction with id=${id} not found.`,
    })
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

module.exports = getTransactionByIdController
