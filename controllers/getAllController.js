const { Transaction } = require('../models')
const axios = require('axios')
require('dotenv').config()
const { API_KEY } = process.env

axios.defaults.baseURL = `https://api.etherscan.io`

const getAllController = async (req, res) => {
  const blockNumberData = await axios.get(
    `/api?module=proxy&action=eth_blockNumber&apikey=${API_KEY}`,
  )
  const blockNumber = blockNumberData.data.result

  const { data } = await axios.get(
    `/api?module=proxy&action=eth_getBlockByNumber&tag=${blockNumber}&boolean=true&apikey=${API_KEY}`,
  )
  const transactions = data.result.transactions

  const count = await Transaction.count()

  if (transactions && transactions.length !== count) {
    console.log('length is differ')
    Transaction.deleteMany({})
    Transaction.insertMany(transactions)
  }

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
