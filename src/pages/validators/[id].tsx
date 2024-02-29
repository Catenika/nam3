import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import clsxm from '@/lib/clsxm';
import { convertTimeFormat } from '@/lib/date';

import { useGetValidatorBlock, useGetValidatorDetail, useGetValidatorSignature } from '@/data-hooks/validators';

import PageTitle from '@/components/page-title/PageTitle';

import Layout from '@/layout/Main';
import Seo from '@/shared/Seo';

export default function ValidatorDetail() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const { id } = query as { id: string };
  const { data: ValidatorDetail, isFetching } = useGetValidatorDetail(id);
  const { data: ValidatorBlocks  } = useGetValidatorBlock(id);
  const { data: ValidatorSignature } = useGetValidatorSignature(id);

  return (
    <Layout>
      <Seo templateTitle={t('page.validators')} />
      <div className='main font-Quantico bg-black px-[100px]'>
        <PageTitle>Validator Detail</PageTitle>
        <div className='top-list py-[10px] text-white'>
          <div className='py-[20px] text-[24px] font-bold'>Validated Blocks</div>
          <table className='mb-[20px] w-full table-auto border-gray-200'>
            <thead>
              <tr className='bg-purple-20 custom-clip-path h-[50px] px-[20px]'>
                <th className='w-20 text-center'>Height</th>
                <th className='w-1/5 text-center'>Block Id</th>
                <th className='w-[10px] text-center'>Time</th>
              </tr>
            </thead>
            <tbody>
              {ValidatorDetail?.validatedBlocks.map((item: any, index: number) => (
                <tr
                  key={index}
                  className={clsxm('border-gray-5 00 my-1 h-[50px] w-full border-b', {
                    'bg-purple-20': index % 2 !== 0,
                  })}
                >
                  <td className='truncate px-6 text-center'>{item.header_height}</td>
                  <td className='text-center'>{item.block_id}</td>
                  <td className='text-center'>{convertTimeFormat(item.header_time)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Uptime */}
        <div className='flex top-list py-[10px] text-white'>
          <div className='w-[calc(50%-100px)] mr-[10px]'>
            <div className='py-[20px] text-[24px] font-bold'>Uptime</div>
            <div className='pb-[20px] w-full rounded-[20px] bg-purple-10 mb-[50px] p-[20px]'>
              <div className='h-[400px] w-full overflow-y-scroll'>
                <table className='mb-[20px] w-full table-auto border-gray-200'>
                  <thead className='top-0 sticky'>
                    <tr className='bg-purple-20 custom-clip-path h-[50px] px-[20px]'>
                      <th className='w-1/2 text-center'>Block number</th>
                      <th className='w-1/2 text-center'>Sign status</th>
                    </tr>
                  </thead>
                  <tbody className='top-[40px]'>
                    {ValidatorDetail?.uptime.map((item: any, index: number) => (
                      <tr
                        key={index}
                        className={clsxm('border-gray-5 00 my-1 h-[50px] w-full border-b', {
                          'bg-purple-20': index % 2 !== 0,
                        })}
                      >
                        <td className='w-1/2 truncate px-6 text-center'>{item.block_number}</td>
                        <td className='w-1/2 text-center'>{item.sign_status ? 'True' : 'False'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
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
