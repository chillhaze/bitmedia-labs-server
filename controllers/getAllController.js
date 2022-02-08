const axios = require('axios')
require('dotenv').config()
const { Transaction } = require('../models')
const { API_KEY } = process.env

const BASE_URL = 'https://api.etherscan.io'

axios.defaults.baseURL = `${BASE_URL}`

const getAllController = async (req, res) => {
  const blockNumberData = await axios.get(
    `/api?module=proxy&action=eth_blockNumber&apikey=${API_KEY}`,
  )
  const recentBlockNumber = blockNumberData.data.result

  const { data } = await axios.get(
    `/api?module=proxy&action=eth_getBlockByNumber&tag=${recentBlockNumber}&boolean=true&apikey=${API_KEY}`,
  )

  const blockNumberInfo = data.result

  const count = await Transaction.count()
  // const previousTransaction = await Transaction.findOne({})

  // await Transaction.deleteMany({
  //   number: previousTransaction.number,
  // })

  if (count >= 10) {
    const firstTransaction = await Transaction.findOne({})
    await Transaction.deleteMany({
      number: firstTransaction.number,
    })
  }

  await Transaction.insertMany(blockNumberInfo)
  // await Transaction.deleteMany({
  //   blockNumber: '0xd825cb',
  // })

  const result = await Transaction.find({})

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

module.exports = getAllController
