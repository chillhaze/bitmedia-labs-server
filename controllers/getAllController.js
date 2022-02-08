const { Transaction } = require('../models')
const axios = require('axios')
require('dotenv').config()
const { API_KEY } = process.env

axios.defaults.baseURL = `https://api.etherscan.io`

const getAllController = async (req, res) => {
  const blockNumberData = await axios.get(
    `/api?module=proxy&action=eth_blockNumber&apikey=${API_KEY}`,
  )
  const recentBlockNumber = blockNumberData.data.result

  const { data } = await axios.get(
    `/api?module=proxy&action=eth_getBlockByNumber&tag=${recentBlockNumber}&boolean=true&apikey=${API_KEY}`,
  )
  const transactions = data.result.transactions

  const count = await Transaction.count()
  const previousTransaction = await Transaction.findOne({})

  if (count > 0 && previousTransaction.blockNumber !== recentBlockNumber) {
    console.log('collection is differ!')

    await Transaction.deleteMany({
      blockNumber: previousTransaction.blockNumber,
    })

    await Transaction.insertMany(transactions)
    // await Transaction.deleteMany({
    //   blockNumber: '0xd82291',
    // })

    const result = await Transaction.find({})

    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    })
  } else {
    await Transaction.insertMany(transactions)

    const result = await Transaction.find({})

    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    })
  }
}

module.exports = getAllController
