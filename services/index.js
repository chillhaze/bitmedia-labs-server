const getRecentBlockNumber = require('./getRecentBlockNumber')
const getRecentBlockRecursion = require('./getRecentBlockRecursion')
const deleteAllTransactions = require('./deleteAllTransactions')
const getFirstTransactions = require('./getFirstTransactions')
const deleteOneBlock = require('./deleteOneBlock')

module.exports = {
  getRecentBlockRecursion,
  getRecentBlockNumber,
  deleteAllTransactions,
  getFirstTransactions,
  deleteOneBlock,
}
