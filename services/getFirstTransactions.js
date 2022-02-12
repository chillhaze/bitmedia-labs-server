const { Transaction } = require('../models')
const axios = require('axios')
const hexToDecConvert = require('../utils/hexToDecConvert')
const decToHexConvert = require('../utils/decToHexConvert')
const dateConvert = require('../utils/dateConvert')
const weiToEtherConvert = require('../utils/weiToEtherConvert')
const transactionFeeCalc = require('../utils/transactionFeeCalc')
const sleepFunction = require('../utils/sleepFunction')
require('dotenv').config()

const TOTAL_BLOCKS_IN_COLLECTION = require('../constants/totalBlocksInCollection')

const { API_KEY } = process.env
const BASE_URL = 'https://api.etherscan.io'
axios.defaults.baseURL = `${BASE_URL}`

async function getFirstTransactions(recentBlockNumber) {
  const oldestBlockNumberInDB =
    hexToDecConvert(recentBlockNumber) - TOTAL_BLOCKS_IN_COLLECTION

  for (
    let i = oldestBlockNumberInDB;
    i < hexToDecConvert(recentBlockNumber);
    i++
  ) {
    // console.log(oldestBlockNumberInDB)
    // console.log(hexToDecConvert(recentBlockNumber))
    let blockNumber = `0x${decToHexConvert(i)}`
    const { data } = await axios.get(
      `/api?module=proxy&action=eth_getBlockByNumber&tag=${blockNumber}&boolean=true&apikey=${API_KEY}`,
    )

    blockData = data.result
    console.log('found block number', hexToDecConvert(blockNumber))

    // Transactions Array of block
    const blockDataTransactions = blockData.transactions

    // Date converted to Mon-dd-yyyy
    const blockTimestamp = dateConvert(blockData.timestamp)

    blockDataTransactions.map(async item => {
      if (item.to) {
        await Transaction.create({
          blockHash: item.blockHash,
          blockNumber: hexToDecConvert(item.blockNumber),
          transactionId: item.hash,
          senderAdress: item.from,
          recipientsAdress: item.to,
          blockConfirmations: 0,
          date: blockTimestamp,
          value: weiToEtherConvert(item.value),
          transactionFee: transactionFeeCalc(item.gas, item.gasPrice),
        })
      }
    })

    sleepFunction(150)

    const count = await Transaction.count()
    console.log(
      `Total transactions count in DB after adding block=${hexToDecConvert(
        blockNumber,
      )}`,
      count,
    )
  }
}

module.exports = getFirstTransactions
