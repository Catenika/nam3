import { dehydrate,QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from 'react';
import { useTranslation } from "react-i18next";
import { ImSpinner2 } from "react-icons/im";

import clsxm from "@/lib/clsxm";

import { useGetBlockDetail, useGetBlockSignatures, useGetBlockTransactions } from "@/data-hooks/lastestBlock";

import MiddleEllipsisText from "@/components/ellipsis/MiddleEllipsisText";
import PageTitle from "@/components/page-title/PageTitle";

import Layout from "@/layout/Main";
import Seo from "@/shared/Seo";

export default function BlockDetailPage() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const { id } = query as { id: string };
  const { data: BlockDetail, isFetching } = useGetBlockDetail(id);
  const { data: BlockSignatures, isFetching: signatureFetching } = useGetBlockSignatures(id);
  const { data: BlockTransactions, isFetching: transitionsFetching } = useGetBlockTransactions(id);

  return (
    <Layout>
      <Seo templateTitle={t('page.blocks')} />
      <div className='main font-Quantico bg-black px-[100px]'>
        <PageTitle>Block Detail</PageTitle>

        <div className='flex-container items-center justify-center m-auto flex flex-wrap gap-10 py-[30px]'>
            <div className='flex-item bg-purple-10 h-full w-[calc(32%-15px)] flex-col items-center justify-between rounded-[30px] border-[1px] border-gray-400'>
            <div className='border-b border-gray-400 py-[16px] text-center text-[16px] font-medium text-white'>
                Height
              </div>
              <div className='relative flex h-[50px] flex-grow items-center justify-center text-center text-[20px] font-bold text-white'>
                {isFetching ? (
                <div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                  <ImSpinner2 className='animate-spin' />
                </div>
                ) : (
                  <span>{BlockDetail?.header_height}</span>)}
              </div>
            </div>
            <div className='flex-item bg-purple-10 h-full w-[calc(32%-15px)] flex-col items-center justify-between rounded-[30px] border-[1px] border-gray-400'>
              <div className='border-b border-gray-400 px-[16px] py-[16px] text-center text-[16px] font-medium text-white'>
                Block time
              </div>
              <div className='relative flex h-[50px] flex-grow items-center justify-center text-center text-[20px] font-bold text-white'>
                {isFetching ? (
                <div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                  <ImSpinner2 className='animate-spin' />
                </div>
                ) : (
                  <span>{BlockDetail?.header_time}</span>)}
              </div>
            </div>
            <div className='flex-item bg-purple-10 h-full w-[calc(32%-15px)] flex-col items-center justify-between rounded-[30px] border-[1px] border-gray-400'>
              <div className='border-b border-gray-400 py-[16px] text-center text-[16px] font-medium text-white'>
                Number of Txs
              </div>
                <div className='relative flex h-[50px] flex-grow items-center justify-center text-center text-[20px] font-bold text-white'>
              {isFetching ? (
                <div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                  <ImSpinner2 className='animate-spin' />
                </div>
                ) : (
                  <span>{BlockDetail?.transactions_count}</span>)}
                </div>
            </div>

            <div className='flex-item bg-purple-10 h-full w-[calc(50%-20px)] flex-col items-center justify-between rounded-[30px] border-[1px] border-gray-400'>
              <div className='border-b border-gray-400 py-[16px] text-center text-[16px] font-medium text-white'>
               Proposer
              </div>
                <div className='relative flex h-[50px] flex-grow items-center justify-center text-center text-[20px] font-bold text-white'>
              {isFetching ? (
                <div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                  <ImSpinner2 className='animate-spin' />
                </div>
              ) : (
                  <span>{BlockDetail?.header_proposer_address}</span>)}
                </div>
          </div>
          <div className='flex-item bg-purple-10 h-full w-[calc(50%-20px)] flex-col items-center justify-between rounded-[30px] border-[1px] border-gray-400'>
              <div className='border-b border-gray-400 py-[16px] text-center text-[16px] font-medium text-white'>
               Hash
              </div>
                <div className='relative flex h-[50px] flex-grow items-center justify-center text-center text-[20px] font-bold text-white'>
              {isFetching ? (
                <div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                  <ImSpinner2 className='animate-spin' />
                </div>
              ) : (
                <MiddleEllipsisText text={BlockDetail?.block_id} />)}
                </div>
            </div>
          </div>
        <div className="flex text-white">
          <div className='w-[calc(50%-10px)] mr-[10px]'>
            <div className='py-[20px] text-[24px] font-bold'>SIGNATURES</div>
            <div className='relative h-[300px] overflow-y-auto p-[20px] mb-[24px] rounded-[20px] bg-purple-10'>
              {signatureFetching ? (
                <div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                  <ImSpinner2 className='animate-spin' />
                </div>
              ) : (
              BlockSignatures?.map((item: any, index: any) => (
                item?.validator_address != '' &&
                <div className='h-[50px] bg-purple-20 py-[12px] px-[16px] rounded-[20px] mb-[8px] border border-gray-500' key={index}>{item?.validator_address}</div>
              )))}
            </div>
          </div>
          <div className='w-[calc(50%-10px)] ml-[10px]'>
            <div className='py-[20px] text-[24px] font-bold'>TRANSACTIONS</div>
            <div className='relative h-[300px] overflow-y-auto p-[20px] mb-[24px] rounded-[20px] bg-purple-10'>
              {transitionsFetching ? (
                <div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                  <ImSpinner2 className='animate-spin' />
                </div>
              ) : (
                BlockTransactions?.map((item: any, index: any) => (
                  item?.hash != '' &&
                  <div className='h-[50px] bg-purple-20 py-[12px] px-[16px] rounded-[20px] mb-[8px] border border-gray-500' key={index}>{item?.hash}</div>
                )))}
            </div>
          </div>
        </div>
      </div>

    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const { id } = query as { id: string };
  const queryClient = new QueryClient();

  // await queryClient.fetchQuery([apiUrl.BLOCK_LIST, id], () => getBlockDetail(id));
  // await queryClient.fetchQuery([apiUrl.BLOCK_SIGNATURES, id], () => getBlockSignatures(id));
  // await queryClient.fetchQuery([apiUrl.BLOCK_TRANSACTIONS, id], () => getBlockTransactions(id));

  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common']))),
      // Will be passed to the page component as props
      dehydratedState: dehydrate(queryClient),
    },
  };
};