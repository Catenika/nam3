import { useQuery } from '@tanstack/react-query';

import { getTransactionDetail, getTransactions } from '@/api-services/transaction';
import { apiUrl } from '@/constant/api-url';

export const useGetTransaction = (records: number) => {
  return useQuery({
    queryKey: [apiUrl.TRANSACTIONS, records],
    queryFn: () => getTransactions(records),
    select(data) {
        return data;
    },
  });
};

export const useGetTransactionDetail = (hash: string) => {
  return useQuery({
    queryKey: [apiUrl.TRANSACTION, hash],
    queryFn: () => getTransactionDetail(hash),
    select(data) {
      return data;
    },
  });
}
