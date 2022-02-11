const axios = require('axios')
require('dotenv').config()

const { API_KEY } = process.env

const BASE_URL = 'https://api.etherscan.io'
axios.defaults.baseURL = `${BASE_URL}`

// Get Recent block number
async function getRecentBlockNumber() {
  const blockNumberData = await axios.get(
    `/api?module=proxy&action=eth_blockNumber&apikey=${API_KEY}`,
  )
  const recentBlockNumber = blockNumberData.data.result

  return recentBlockNumber
}

module.exports = getRecentBlockNumber
