const { Schema, model, SchemaTypes } = require('mongoose')

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

const Transaction = model('transaction', transactionSchema)

module.exports = Transaction
