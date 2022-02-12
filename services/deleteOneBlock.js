const { Transaction } = require('../models')

async function deleteOneBlock(oldestBlockNumberInDB) {
  console.log(`Removing ${oldestBlockNumberInDB} block...`)

  return await Transaction.deleteMany({
    blockNumber: oldestBlockNumberInDB,
  })
}

module.exports = deleteOneBlock
