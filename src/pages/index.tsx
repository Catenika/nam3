import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { ImSpinner2 } from 'react-icons/im';

import clsxm from '@/lib/clsxm';

import {
  useGetLastestBlockList, useLastestBlock
} from '@/data-hooks/lastestBlock';
import { useGetValidators } from '@/data-hooks/validators';

import { getLastestBlock, getLastestBlockList } from '@/api-services/lastTestBlock';
import { getValidators } from '@/api-services/validators';
import { apiUrl } from '@/constant/api-url';
import { appRouters } from '@/constant/app-routers';
import Layout from '@/layout/Main';
import { LastestBlock } from '@/models/lastestBlock';
import { ValidatorResponse } from '@/models/validators';
import Seo from '@/shared/Seo';

export default function HomePage() {
  const { t } = useTranslation();
  const { data: LastestBlocks, isFetching: lastestBlockFetching } = useLastestBlock();
  const { data: ValidatorsList, isFetching: validatorListFetching } = useGetValidators();
  const { data: LastestBlockList, isFetching: lastestBlockListFetching } = useGetLastestBlockList(10);

  return (
    <>
      <Layout>
        <Seo templateTitle={t('page.home')} />
        <div className='main font-Quantico bg-black px-[100px]'>
          <div className='flex-container m-auto flex flex-wrap gap-10 py-[30px]'>
            <div className='flex-item bg-purple-10 h-full w-[calc(30%-20px)] flex-col items-center justify-between rounded-[30px] border-[1px] border-gray-400'>
              <div className='border-b border-gray-400 py-[16px] text-center text-[16px] font-medium text-white'>
                Latest Block
              </div>
              <div className='relative flex h-[50px] flex-grow items-center justify-center text-center text-[20px] font-bold text-white'>
                {lastestBlockFetching ? (
                <div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                  <ImSpinner2 className='animate-spin' />
                </div>
                ) : (
                  <span>{LastestBlocks?.header_height}</span>)}
              </div>
            </div>
            <div className='flex-item bg-purple-10 h-full w-[calc(30%-20px)] flex-col items-center justify-between rounded-[30px] border-[1px] border-gray-400'>
              <div className='border-b border-gray-400 px-[16px] py-[16px] text-center text-[16px] font-medium text-white'>
                Block time
              </div>
              <div className='relative flex h-[50px] flex-grow items-center justify-center text-center text-[20px] font-bold text-white'>
                {lastestBlockFetching ? (
                <div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                  <ImSpinner2 className='animate-spin' />
                </div>
                ) : (
                  <span>{LastestBlocks?.header_time}</span>)}
              </div>
            </div>
            <div className='flex-item bg-purple-10 h-full w-[calc(30%-20px)] flex-col items-center justify-between rounded-[30px] border-[1px] border-gray-400'>
              <div className='border-b border-gray-400 py-[16px] text-center text-[16px] font-medium text-white'>
                Active Validators
              </div>
                <div className='relative flex h-[50px] flex-grow items-center justify-center text-center text-[20px] font-bold text-white'>
              {validatorListFetching ? (
                <div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                  <ImSpinner2 className='animate-spin' />
                </div>
                ) : (
                  <span>{ValidatorsList?.length}</span>)}
                </div>
            </div>
          </div>

          {/* Validator list */}
          <div className='top-list text-white'>
            <div className='py-[20px] text-[24px] font-bold'>TOP 10 VALIDATORS</div>
            <table className='w-full table-auto border-gray-200'>
              <thead>
                <tr className='bg-purple-20 custom-clip-path h-[50px] px-[20px]'>
                  <th className='w-20 text-center'>Moniker</th>
                  <th className='w-1/5 text-center'>Address</th>
                  <th className='w-[10px] text-center'>VP</th>
                  <th className='w-20 text-center'>Proposer Priority</th>
                  <th className='w-20 text-center'>Commission Rate</th>
                </tr>
              </thead>
              <tbody>
                {ValidatorsList?.slice(0, 10).map((item: ValidatorResponse, index: any) => (
                  <tr
                    key={index}
                    className={clsxm('border-gray-5 00 my-1 h-[50px] border-b', { 'bg-purple-20': index % 2 !== 0 })}
                  >
                    <td className='w-20 text-center'>{item.moniker}</td>
                    <td className='text-center w-1/3'>
                      <Link href={`${appRouters.VALIDATORS}/${item.address}`} className='w-[100px] text-center px-[20px] underline'>
                          {item.operator_address}
                      </Link>
                    </td>
                    <td className='w-[10px] text-center'>{item.voting_power}</td>
                    <td className='w-[20px] text-center'>{item.proposer_priority}</td>
                    <td className='w-[20px] text-center'>{Math.round(item.voting_percentage) / 100}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Lastest Blocks list */}
          <div className='top-list py-[30px] text-white'>
            <div className='py-[20px] text-[24px] font-bold'>LASTEST BLOCK</div>
            <table className='w-full table-auto border-gray-200'>
              <thead>
                <tr className='bg-purple-20 custom-clip-path h-[50px] px-[20px]'>
                  <th className='w-20 text-center'>Block height</th>
                  <th className='w-1/5 text-center'>Hash</th>
                  <th className='w-[10px] text-center'>Proposer</th>
                  <th className='w-20 text-center'>Nb of Txs</th>
                  <th className='w-20 text-center'>Time</th>
                </tr>
              </thead>
              <tbody>
                {LastestBlockList?.slice(0, 10).map((item: LastestBlock, index: number) => (

                    <tr key={item.header_height}
                      className={clsxm('w-full border-gray-5 00 my-1 h-[50px] border-b', { 'bg-purple-20': index % 2 !== 0 })}
                  >
                      <td className='text-center'>
                        <Link href={`${appRouters.BLOCKS}/${item.header_height}`} className='w-[100px] text-center px-[20px] underline'>
                          {item.header_height}
                        </Link>
                      </td>
                      <td className='truncate px-6 text-center'>{item.header_data_hash}</td>
                      <td className='text-center'>{item.header_proposer_address}</td>
                      <td className='text-center'>{item.transactions_count}</td>
                      <td className='text-center'>{item.header_time}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([apiUrl.LASTEST_BLOCK]), () => getLastestBlock();
  await queryClient.prefetchQuery([apiUrl.VALIDATORS]), () => getValidators();
  await queryClient.prefetchQuery([apiUrl.LASTEST_BLOCK_LIST]), () => getLastestBlockList(10);

  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common', 'home']))),
      // Will be passed to the page component as props
      dehydratedState: dehydrate(queryClient),
    },
  };
};
