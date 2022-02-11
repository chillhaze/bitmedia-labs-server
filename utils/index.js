const sleepFunction = require('./sleepFunction')
const hexToDecConvert = require('./hexToDecConvert')
const decToHexConvert = require('./decToHexConvert')
const dateConvert = require('./dateConvert')
const weiToEtherConvert = require('./weiToEtherConvert')
const transactionFeeCalc = require('./transactionFeeCalc')

module.exports = {
  dateConvert,
  decToHexConvert,
  hexToDecConvert,
  sleepFunction,
  transactionFeeCalc,
  weiToEtherConvert,
}
