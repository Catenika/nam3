import axios from '@/lib/axios';

import { apiUrl } from '@/constant/api-url';
import { LastestBlockResponse } from '@/models/lastestBlock';

export const getLastestBlock = async () => {
  const response = await axios.get<LastestBlockResponse>(apiUrl.LASTEST_BLOCK);
  return response;
};

export const getLastestBlockList = async (records: number) => {
  const response = await axios.get(apiUrl.LASTEST_BLOCK_LIST + '/' + records);
  return response;
};

export const getBlockDetail = async (id: string) => {
  const response = await axios.get<LastestBlockResponse>(apiUrl.BLOCK_LIST + '/' + id);

  return response.data;
};

export const getBlockSignatures = async (id: string) => {
  const response = await axios.get(apiUrl.BLOCK_LIST + '/' + id + '/signatures');

  return response.data;
};

export const getBlockTransactions = async (id: string) => {
  const response = await axios.get(apiUrl.BLOCK_LIST + '/' + id + '/transactions');

  return response.data;
};

