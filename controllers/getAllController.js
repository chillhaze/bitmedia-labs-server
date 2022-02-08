const axios = require('axios')
require('dotenv').config()
const { Transaction } = require('../models')
const { API_KEY } = process.env

const BASE_URL = 'https://api.etherscan.io'
axios.defaults.baseURL = `${BASE_URL}`

const getAllController = async (req, res) => {
  const { page = 1, limit = 15 } = req.query
  const skip = (page - 1) * limit
  // Get Recent block number
  const blockNumberData = await axios.get(
    `/api?module=proxy&action=eth_blockNumber&apikey=${API_KEY}`,
  )
  const recentBlockNumber = blockNumberData.data.result

  // Get Block by recent block number
  const { data } = await axios.get(
    `/api?module=proxy&action=eth_getBlockByNumber&tag=${recentBlockNumber}&boolean=true&apikey=${API_KEY}`,
  )
  const blockNumberInfo = data.result.transactions

  // Get previous block number in collection
  const previousTransaction = await Transaction.findOne({})
  // const count = await Transaction.count()

  // if (count >= 10) {
  //   const firstTransaction = await Transaction.findOne({})
  //   await Transaction.deleteMany({
  //     number: firstTransaction.number,
  //   })
  // }

  if (previousTransaction.blockNumber !== recentBlockNumber) {
    // Delete transactions if recent block not equal block number in collection
    await Transaction.deleteMany({
      blockNumber: previousTransaction.blockNumber,
    })
  }

  // Insert transactions in collection
  await Transaction.insertMany(blockNumberInfo)
  // await Transaction.deleteMany({
  //   blockNumber: '0xd825cb',
  // })

  const result = await Transaction.find({}, '', { skip, limit: Number(limit) })

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

module.exports = getAllController
