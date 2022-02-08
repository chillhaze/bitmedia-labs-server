const express = require('express')
const router = express.Router()

const { joiSchema } = require('../../models/transaction')
const { ctrlWrapper, validation } = require('../../middlewares')
const { getAllController, getByIdController } = require('../../controllers')

// use validation middleware with post/put requests - validation(joiSchema)
// router.post('/', validation(joiSchema), ctrlWrapper(getAllController))

router.get('/', ctrlWrapper(getAllController))
router.get('/:id', ctrlWrapper(getByIdController))

module.exports = router
