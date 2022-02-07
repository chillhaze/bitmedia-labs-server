const getTransactions = async (req, res) => {
  // const result =

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

module.exports = getTransactions
