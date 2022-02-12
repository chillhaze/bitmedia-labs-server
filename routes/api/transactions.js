const express = require('express')
const router = express.Router()

// const { joiSchema } = require('../../models/transaction')
const { ctrlWrapper, validation } = require('../../middlewares')
const {
  getTransactions,
  getBySearchParams,
  getBlockByNumber,
} = require('../../controllers')

// use validation middleware with post/put requests - validation(joiSchema)
// router.post('/', validation(joiSchema), ctrlWrapper(getAllController))

router.get('/', ctrlWrapper(getTransactions))
router.get('/search', ctrlWrapper(getBySearchParams))
router.get('/searchByBlockNumber', ctrlWrapper(getBlockByNumber))

module.exports = router
