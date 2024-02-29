export const apiUrl = {
  LASTEST_BLOCK: '/blocks/block/latest',
  LASTEST_BLOCK_LIST: '/blocks/list',
  BLOCK_LIST: '/blocks/block',
  BLOCK_SIGNATURES: '/blocks/block/${id}/signatures',
  BLOCK_TRANSACTIONS: '/blocks/block/${id}/transactions',
  VALIDATORS: '/validators/list',
  TRANSACTIONS: '/transactions/list',
  TRANSACTION: '/transactions/transaction',
  VALIDATOR: '/validators/validator',
  VALIDATOR_BLOCKS: '/validators/validator/{$address}/latestBlocks',
  VALIDATOR_SIGNATURE: '/validators/validator/{$address}/latestSignatures',
};
