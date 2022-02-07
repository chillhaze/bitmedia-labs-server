const getTransactions = async (req, res) => {
  const result = [
    {
      blockHash:
        '0x2d45b3877ee0d7e9f0ab6db53e309d3ae203a28040bd86ca72135e758a011289',
      blockNumber: '0x1b4145',
      from: '0x2a65aca4d5fc5b5c859090a6c34d164135398226',
      gas: '0x15f90',
      gasPrice: '0x4a817c800',
      hash: '0x5c74bfa06191a63c6453b426a14bb81f43ad78af4df1cae0af44b7d0de5426c4',
      input: '0x',
      nonce: '0xd8d81',
      to: '0x466d2200fefb6c74da79c877435d436160ce2686',
      transactionIndex: '0x0',
      value: '0x1126d7a952e58c00',
      type: '0x0',
    },
    {
      blockHash:
        '0x2d45b3877ee0d7e9f0ab6db53e309d3ae203a28040bd86ca72135e758a011289',
      blockNumber: '0x1b4145',
      from: '0x2a65aca4d5fc5b5c859090a6c34d164135398226',
      gas: '0x15f90',
      gasPrice: '0x4a817c800',
      hash: '0xf4dca00b764f971c5df117a835921938aa9769439afe1c639c4cea703021ec03',
      input: '0x',
      nonce: '0xd8d82',
      to: '0xe39234e9664540059460b57222cdbe3cd6da2690',
      transactionIndex: '0x1',
      value: '0xff895bc1f056800',
      type: '0x0',
    },
  ]

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

module.exports = getTransactions
