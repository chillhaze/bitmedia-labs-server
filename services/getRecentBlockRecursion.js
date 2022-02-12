const { Transaction } = require('../models')
const axios = require('axios')
require('dotenv').config()

const TOTAL_BLOCKS_IN_COLLECTION = require('../constants/totalBlocksInCollection')

const { API_KEY } = process.env
const BASE_URL = 'https://api.etherscan.io'
axios.defaults.baseURL = `${BASE_URL}`

const getRecentBlockNumber = require('./getRecentBlockNumber')
const dateConvert = require('../utils/dateConvert')
const hexToDecConvert = require('../utils/hexToDecConvert')
const sleepFunction = require('../utils/decToHexConvert')
const transactionFeeCalc = require('../utils/transactionFeeCalc')
const weiToEtherConvert = require('../utils/weiToEtherConvert')
const getFirstTransactions = require('./getFirstTransactions')
const deleteOneBlock = require('./deleteOneBlock')

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
    console.log('Total transactions count in collection is', count)

    if (count === 0) {
      //Loading first Transactions to db
      await getFirstTransactions(recentBlockNumber)
      console.log('Collection Transactions is filled with transactions.')
    }

    console.log(
      `working with block number `,
      hexToDecConvert(recentBlockNumber),
    )

    recentBlockTransactions.map(async item => {
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
    })

    return
  }

  await getRecentBlock(recentBlockNumber)

  const oldestBlockNumberInDB = await Transaction.findOne({})
    .sort({ _id: 1 })
    .limit(1)
  // console.log('oldest block number', oldestBlockNumberInDB.blockNumber)

  const latestBlockNumberInDB = await Transaction.findOne({})
    .sort({ _id: -1 })
    .limit(1)
  // console.log('latest block number', latestBlockNumberInDB.blockNumber)

  if (
    oldestBlockNumberInDB.blockNumber <
    latestBlockNumberInDB.blockNumber - TOTAL_BLOCKS_IN_COLLECTION
  ) {
    deleteOneBlock(oldestBlockNumberInDB.blockNumber)
    console.log(
      `!!! Oldest Block #${oldestBlockNumberInDB.blockNumber} removed`,
    )
  }

  await sleepFunction(200)

  return await getRecentBlockRecursion()
}

module.exports = getRecentBlockRecursion
