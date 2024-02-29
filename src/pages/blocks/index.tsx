import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import clsxm from '@/lib/clsxm';

import {
  useGetLastestBlockList
} from '@/data-hooks/lastestBlock';

import PageTitle from '@/components/page-title/PageTitle';

import { getLastestBlockList } from '@/api-services/lastTestBlock';
import { apiUrl } from '@/constant/api-url';
import { appRouters } from '@/constant/app-routers';
import Layout from '@/layout/Main';
import { LastestBlock } from '@/models/lastestBlock';
import Button from '@/shared/buttons/Button';
import Seo from '@/shared/Seo';

export default function Blocks() {
  const { t } = useTranslation();
  const [totalRecord, setTotalRecord] = useState(20);
  const { data: BlocksList, isFetching } = useGetLastestBlockList(totalRecord);
  const [blockList, setBlockList] = useState([]);

  const handleClick = () => {
    setTotalRecord(totalRecord + 20);
  };

  useEffect(() => {
    if(!isFetching) {
      setBlockList(BlocksList);
    }
  }, [isFetching]);

  return (
    <>
      <Layout>
        <Seo templateTitle={t('page.blocks')} />
        <div className='main font-Quantico bg-black px-[100px]'>
          <PageTitle>Blocks List</PageTitle>
          {/*Blocks list */}
          <div className='top-list py-[10px] text-white'>
            <table className='w-full table-auto border-gray-200 mb-[20px]'>
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
                {blockList?.map((item: LastestBlock, index: number) => (
                    <tr key={item.header_height}
                      className={clsxm('w-full border-gray-5 00 my-1 h-[50px] border-b', { 'bg-purple-20': index % 2 !== 0 })}
                  >
                      <td className='text-center'>
                        <Link href={`${appRouters.BLOCKS}/${item.header_height}`} className='w-[100px] text-center px-[20px] underline'>
                          {item.header_height}
                        </Link>
                      </td>
                    <td
                      className='truncate px-6 text-center'>{item.header_data_hash}</td>
                      <td className='text-center'>{item.header_proposer_address}</td>
                      <td className='text-center'>{item.transactions_count}</td>
                      <td className='text-center'>{item.header_time}</td>
                    </tr>
                ))}
              </tbody>
            </table>
            <div className='flex justify-end'>
              <Button onClick={handleClick} className='relative' isLoading={isFetching}>
                <span>Load More</span>
                {/* {isFetching && (<div className={clsxm('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', {})}>
                  <ImSpinner2 className='animate-spin' />
                </div>)} */}
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([apiUrl.LASTEST_BLOCK_LIST]), () => getLastestBlockList(20);

  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common']))),
      // Will be passed to the page component as props
      dehydratedState: dehydrate(queryClient),
    },
  };
};

