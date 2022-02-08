const { Schema, model, SchemaTypes } = require('mongoose')
const Joi = require('joi')

// transaction schema
const transactionSchema = Schema(
  {
    // _id: {
    //   type: SchemaTypes.ObjectId,
    //   required: [true, 'Unknown transaction id'],
    // },
    blockHash: {
      type: String,
      required: [true, 'Unknown transaction blockHash'],
      trim: true,
    },
    blockNumber: {
      type: String,
      required: [true, 'Unknown transaction blockNumber'],
    },
    from: {
      type: String,
      required: [true, 'Unknown transaction from'],
    },
    gas: {
      type: String,
      required: [true, 'Unknown transaction gas'],
    },
    gasPrice: {
      type: String,
      required: [true, 'Unknown transaction gasPrice'],
    },
    maxFeePerGas: {
      type: String,
      // required: [true, 'Unknown transaction maxFeePerGas'],
    },
    maxPriorityFeePerGas: {
      type: String,
      // required: [true, 'Unknown transaction maxPriorityFeePerGas'],
    },
    hash: {
      type: String,
      required: [true, 'Unknown transaction hash'],
    },
    input: {
      type: String,
      required: [true, 'Unknown transaction input'],
    },
    nonce: {
      type: String,
      required: [true, 'Unknown transaction nonce'],
    },
    to: {
      type: String,
      // required: [true, 'Unknown transaction to'],
    },
    transactionIndex: {
      type: String,
      required: [true, 'Unknown transaction transactionIndex'],
    },
    value: {
      type: String,
      required: [true, 'Unknown transaction value'],
    },
    type: {
      type: String,
      required: [true, 'Unknown transaction type'],
    },
    accessList: {
      type: Array,
      required: [true, 'Unknown transaction accessList'],
    },
    chainId: {
      type: String,
      // required: [true, 'Unknown transaction chainId'],
    },
    v: {
      type: String,
    },
    r: {
      type: String,
    },
    s: {
      type: String,
    },
  },
  { versionKey: false, timestamps: false },
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

// // transaction schema

// Block Schema
// const transactionSchema = Schema(
//   {
//     baseFeePerGas: {
//       type: String,
//     },
//     difficulty: {
//       type: String,
//       required: [true, 'Unknown block difficulty'],
//     },
//     extraData: {
//       type: String,
//       required: [true, 'Unknown block extraData'],
//     },
//     gasLimit: {
//       type: String,
//       required: [true, 'Unknown block gasLimit'],
//     },
//     gasUsed: {
//       type: String,
//       required: [true, 'Unknown block gasUsed'],
//     },
//     hash: {
//       type: String,
//       required: [true, 'Unknown block hash'],
//     },
//     logsBloom: {
//       type: String,
//       required: [true, 'Unknown block logsBloom'],
//     },
//     miner: {
//       type: String,
//       required: [true, 'Unknown block miner'],
//     },
//     mixHash: {
//       type: String,
//       required: [true, 'Unknown block mixHash'],
//     },
//     nonce: {
//       type: String,
//       required: [true, 'Unknown block nonce'],
//     },
//     number: {
//       type: String,
//       required: [true, 'Unknown block number'],
//     },
//     parentHash: {
//       type: String,
//       required: [true, 'Unknown block parentHash'],
//     },
//     receiptsRoot: {
//       type: String,
//       required: [true, 'Unknown block receiptsRoot'],
//     },
//     sha3Uncles: {
//       type: String,
//       required: [true, 'Unknown block sha3Uncles'],
//     },
//     size: {
//       type: Array,
//       required: [true, 'Unknown block size'],
//     },
//     stateRoot: {
//       type: String,
//       required: [true, 'Unknown block stateRoot'],
//     },
//     timestamp: {
//       type: String,
//       required: [true, 'Unknown block timestamp'],
//     },
//     totalDifficulty: {
//       type: String,
//       required: [true, 'Unknown block totalDifficulty'],
//     },
//     transactions: {
//       type: Array,
//       required: [true, 'Unknown block transactions array'],
//     },
//     transactionsRoot: {
//       type: String,
//       required: [true, 'Unknown block transactionsRoot'],
//     },
//     uncles: {
//       type: Array,
//       required: [true, 'Unknown block uncles'],
//     },
//   },
//   { versionKey: false, timestamps: false },
// )
