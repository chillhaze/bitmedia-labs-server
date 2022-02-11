const { Transaction } = require('../models')
const axios = require('axios')
require('dotenv').config()

const { API_KEY } = process.env
const BASE_URL = 'https://api.etherscan.io'
axios.defaults.baseURL = `${BASE_URL}`

const getRecentBlockNumber = require('./getRecentBlockNumber')
const dateConvert = require('../utils/dateConvert')
const hexToDecConvert = require('../utils/hexToDecConvert')
const sleepFunction = require('../utils/decToHexConvert')
const transactionFeeCalc = require('../utils/transactionFeeCalc')
const weiToEtherConvert = require('../utils/weiToEtherConvert')
// const getFirstTransactions = require('./getFirstTransactions')

async function getRecentBlockRecursion() {
  const recentBlockNumber = await getRecentBlockNumber()

  async function getRecentBlock(recentBlockNumber) {
    const { data } = await axios.get(
      `/api?module=proxy&action=eth_getBlockByNumber&tag=${recentBlockNumber}&boolean=true&apikey=${API_KEY}`,
    )
    blockData = data.result

    // Transactions Array of recent block
    const recentBlockTransactions = blockData.transactions

    // Date converted to Mon-dd-yyyy
    const resentBlockTimestamp = dateConvert(blockData.timestamp)

    // Collection count
    const count = await Transaction.count()
    console.log('Total transactions count in DB', count)

    // Change integer to delete old transactions
    const blockNumberToDelete = hexToDecConvert(recentBlockNumber) - 10

    recentBlockTransactions.map(async item => {
      if (count === 0 && item.to) {
        await Transaction.create({
          blockHash: item.blockHash,
          blockNumber: hexToDecConvert(item.blockNumber),
          transactionId: item.hash,
          senderAdress: item.from,
          recipientsAdress: item.to,
          blockConfirmations: 0,
          date: resentBlockTimestamp,
          value: weiToEtherConvert(item.value),
          transactionFee: transactionFeeCalc(item.gas, item.gasPrice),
        })
      } else {
        await Transaction.deleteMany({
          blockNumber: blockNumberToDelete,
        })

        const sameTransaction = await Transaction.findOne({
          transactionId: item.hash,
        })

        if (!sameTransaction && item.to) {
          Transaction.create({
            blockHash: item.blockHash,
            blockNumber: hexToDecConvert(item.blockNumber),
            transactionId: item.hash,
            senderAdress: item.from,
            recipientsAdress: item.to,
            blockConfirmations: 0,
            date: resentBlockTimestamp,
            value: weiToEtherConvert(item.value),
            transactionFee: transactionFeeCalc(item.gas, item.gasPrice),
          })
        }
      }
    })

    return
  }

  await getRecentBlock(recentBlockNumber)

  await sleepFunction(10000)

  return await getRecentBlockRecursion()
}

module.exports = getRecentBlockRecursion
