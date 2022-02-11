const { Schema, model, SchemaTypes } = require('mongoose')
// const Joi = require('joi')

// transaction schema
const transactionSchema = Schema(
  {
    blockHash: {
      type: String,
      required: [true, 'Unknown transaction blockHash'],
    },
    blockNumber: {
      type: Number,
      required: [true, 'Unknown transaction blockNumber'],
    },
    transactionId: {
      type: String,
      required: [true, 'Unknown transaction ID'],
    },
    senderAdress: {
      type: String,
      required: [true, 'Unknown transaction senderAdress'],
    },
    recipientsAdress: {
      type: String,
      required: [true, 'Unknown transaction recipientsAddress'],
    },
    blockConfirmations: {
      type: Number,
      required: [true, 'Unknown transaction blockConfirmations'],
    },
    date: {
      type: String,
      required: [true, 'Unknown transaction date'],
    },
    value: {
      type: Number,
      required: [true, 'Unknown transaction value'],
    },
    transactionFee: {
      type: Number,
      required: [true, 'Unknown transaction transactionFee'],
    },
  },
  { versionKey: false, timestamps: true },
)

//  Joi Schema
// const joiSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().email({
//     minDomainSegments: 2,
//     tlds: { allow: ['com', 'net', 'ru', 'ua', 'uk', 'org', 'ca'] },
//   }),
//   phone: Joi.string(),
//   favorite: Joi.boolean(),
// })

const Transaction = model('transaction', transactionSchema)

module.exports = Transaction

// With Joi Schema
// module.exports = {
//   Transaction,
//   joiSchema,
// }

// Raw transaction schema
// const transactionSchema = Schema(
//   {
//     // _id: {
//     //   type: SchemaTypes.ObjectId,
//     //   required: [true, 'Unknown transaction id'],
//     // },
//     blockHash: {
//       type: String,
//       required: [true, 'Unknown transaction blockHash'],
//       trim: true,
//     },
//     blockNumber: {
//       type: String,
//       required: [true, 'Unknown transaction blockNumber'],
//     },
//     from: {
//       type: String,
//       required: [true, 'Unknown transaction from'],
//     },
//     gas: {
//       type: String,
//       required: [true, 'Unknown transaction gas'],
//     },
//     gasPrice: {
//       type: String,
//       required: [true, 'Unknown transaction gasPrice'],
//     },
//     maxFeePerGas: {
//       type: String,
//       // required: [true, 'Unknown transaction maxFeePerGas'],
//     },
//     maxPriorityFeePerGas: {
//       type: String,
//       // required: [true, 'Unknown transaction maxPriorityFeePerGas'],
//     },
//     hash: {
//       type: String,
//       required: [true, 'Unknown transaction hash'],
//     },
//     input: {
//       type: String,
//       required: [true, 'Unknown transaction input'],
//     },
//     nonce: {
//       type: String,
//       required: [true, 'Unknown transaction nonce'],
//     },
//     to: {
//       type: String,
//       // required: [true, 'Unknown transaction to'],
//     },
//     transactionIndex: {
//       type: String,
//       required: [true, 'Unknown transaction transactionIndex'],
//     },
//     value: {
//       type: String,
//       // required: [true, 'Unknown transaction value'],
//     },
//     type: {
//       type: String,
//       // required: [true, 'Unknown transaction type'],
//     },
//     accessList: {
//       type: Array,
//       required: [true, 'Unknown transaction accessList'],
//     },
//     chainId: {
//       type: String,
//       // required: [true, 'Unknown transaction chainId'],
//     },
//     v: {
//       type: String,
//     },
//     r: {
//       type: String,
//     },
//     s: {
//       type: String,
//     },
//   },
//   { versionKey: false, timestamps: false },
// )
