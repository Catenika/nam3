import axios from '@/lib/axios';

import { apiUrl } from '@/constant/api-url';

export const getValidators = async () => {
  const response = await axios.get(apiUrl.VALIDATORS);

  return response.data;
};

export const getValidatorDetail = async (address: string) => {
  const response = await axios.get(apiUrl.VALIDATOR + '/' + address);

  return response.data;
};

export const getValidatorBlocks = async (address: string) => {
  const response = await axios.get(apiUrl.VALIDATOR + '/' + address + 'latestBlocks');

  return response.data;
};

export const getValidatorSignatures = async (address: string) => {
  const response = await axios.get(apiUrl.VALIDATOR + '/' + address + 'latestSignatures');

  return response.data;
};
