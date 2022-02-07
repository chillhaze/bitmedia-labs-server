const { Transaction } = require('../models')

const getByIdController = async (req, res) => {
  const { id } = req.params

  // const result = await Transaction.getById(id)
  const result = await Transaction.find({
    hash: id,
  })

  if (!result) {
    const error = new Error(`Transaction with id=${id} not found.`)
    error.status = 404
    throw error
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

module.exports = getByIdController
