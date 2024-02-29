import { dehydrate,QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from 'react';
import { useTranslation } from "react-i18next";
import { ImSpinner2 } from "react-icons/im";

import clsxm from "@/lib/clsxm";
import { convertTimeFormat } from "@/lib/date";

import { useGetTransactionDetail } from "@/data-hooks/transactions";

import PageTitle from "@/components/page-title/PageTitle";

import Layout from "@/layout/Main";
import Seo from "@/shared/Seo";

export default function TransactionDetailPage() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const { id } = query as { id: string };
  const { data: TransactionDetail, isFetching } = useGetTransactionDetail(id);

  return (
    <Layout>
      <Seo templateTitle={t('page.transactions')} />
      <div className='main font-Quantico bg-black px-[100px]'>
        <PageTitle>Transaction Detail</PageTitle>

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
                  <span>{TransactionDetail?.header_height}</span>)}
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
                  <span>{convertTimeFormat(TransactionDetail?.header_time)}</span>)}
              </div>
            </div>
            <div className='flex-item bg-purple-10 h-full w-[calc(32%-15px)] flex-col items-center justify-between rounded-[30px] border-[1px] border-gray-400'>
              <div className='border-b border-gray-400 py-[16px] text-center text-[16px] font-medium text-white'>
                Type
              </div>
                <div className='relative flex h-[50px] flex-grow items-center justify-center text-center text-[20px] font-bold text-white'>
              {isFetching ? (
                <div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                  <ImSpinner2 className='animate-spin' />
                </div>
                ) : (
                  <span>{TransactionDetail?.tx_type}</span>)}
                </div>
            </div>
            <div className='flex-item bg-purple-10 h-full w-[calc(70%)] flex-col items-center justify-between rounded-[30px] border-[1px] border-gray-400 mb-[50px]'>
              <div className='border-b border-gray-400 py-[16px] text-center text-[16px] font-medium text-white'>
               Hash
              </div>
                <div className='relative flex h-[50px] flex-grow items-center justify-center text-center text-[20px] font-bold text-white'>
              {isFetching ? (
                <div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                  <ImSpinner2 className='animate-spin' />
                </div>
              ) : (
                  <span>{TransactionDetail?.hash}</span>)}
                </div>
          </div>
          </div>
      </div>

    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const queryClient = new QueryClient();

  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common']))),
      // Will be passed to the page component as props
      dehydratedState: dehydrate(queryClient),
    },
  };
};