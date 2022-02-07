const express = require('express')
const router = express.Router()

const { ctrlWrapper, validation } = require('../../middlewares')
const { transactionsSchema } = require('../../schemas')
const { getAllController, getByIdController } = require('../../controllers')

const validateMiddleware = validation(transactionsSchema)

router.get('/', ctrlWrapper(getAllController))
router.get('/:id', ctrlWrapper(getByIdController))

module.exports = router
