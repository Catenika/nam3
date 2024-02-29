import axios from '@/lib/axios';

import { apiUrl } from '@/constant/api-url';

export const getTransactions = async (records: number) => {
  const response = await axios.get(apiUrl.TRANSACTIONS + '/' + records);
  return response.data;
};

export const getTransactionDetail = async (hash: string) => {
  const response = await axios.get(apiUrl.TRANSACTION + '/' + hash);

  return response.data;
};
