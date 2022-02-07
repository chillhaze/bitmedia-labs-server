const express = require('express')
const router = express.Router()

const { getTransactions } = require('../../controllers')

router.get('/', getTransactions)

module.exports = router
