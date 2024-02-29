import { useQuery } from '@tanstack/react-query';

import { getBlockDetail, getBlockSignatures, getBlockTransactions, getLastestBlock, getLastestBlockList } from '@/api-services/lastTestBlock';
import { apiUrl } from '@/constant/api-url';
import { LastestBlockResponse } from '@/models/lastestBlock';

import HttpStatusCode from '@/types/http-status-code';

export const useLastestBlock = () => {
  return useQuery({
    queryKey: [apiUrl.LASTEST_BLOCK],
    queryFn: () => getLastestBlock(),
    select(data) {
      if (data.status === HttpStatusCode.OK) {
        return new LastestBlockResponse(data.data);
      }
      return undefined;
    },
  });
};

export const useGetLastestBlockList = (records: number) => {
  return useQuery({
    queryKey: [apiUrl.LASTEST_BLOCK_LIST, records],
    queryFn: () => getLastestBlockList(records),
    select(data) {
      if (data.status === HttpStatusCode.OK) {
        return data?.data?.map((item: LastestBlockResponse) => new LastestBlockResponse(item)) ?? [];
      }
      return undefined;
    },
  });
};

export const useGetBlockDetail = (id: string) => {
  return useQuery({
    queryKey: [apiUrl.BLOCK_LIST, id],
    queryFn: () => getBlockDetail(id),
    select(data) {
      return new LastestBlockResponse(data);
    },
  });
}

export const useGetBlockSignatures = (id: string) => {
  return useQuery({
    queryKey: [apiUrl.BLOCK_SIGNATURES, id],
    queryFn: () => getBlockSignatures(id),
    select(data) {
      return data;
    },
  });
};

export const useGetBlockTransactions = (id: string) => {
  return useQuery({
    queryKey: [apiUrl.BLOCK_TRANSACTIONS, id],
    queryFn: () => getBlockTransactions(id),
    select(data) {
      return data;
    },
  });
};
