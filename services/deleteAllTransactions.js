const { Transaction } = require('../models')

async function deleteAllTransactions() {
  await Transaction.deleteMany({})
  const result = await Transaction.find({})
  return console.log(
    `success, all transactions deleted, collection length = ${result.length}`,
  )
}
module.exports = deleteAllTransactions
