const { Transaction } = require('../models')
const axios = require('axios')
require('dotenv').config()

const { API_KEY } = process.env
const BASE_URL = 'https://api.etherscan.io'
axios.defaults.baseURL = `${BASE_URL}`

async function getFirstTransactions(recentBlockNumber) {
  // const { data } = await axios.get(
  //   `/api?module=proxy&action=eth_getBlockByNumber&tag=${recentBlockNumber}&boolean=true&apikey=${API_KEY}`,
  // )
  // blockData = data.result
}

module.exports = getFirstTransactions
