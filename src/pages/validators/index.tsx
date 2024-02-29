import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import clsxm from '@/lib/clsxm';

import { useGetValidators } from '@/data-hooks/validators';

import MiddleEllipsisText from '@/components/ellipsis/MiddleEllipsisText';
import PageTitle from '@/components/page-title/PageTitle';

import { getValidators } from '@/api-services/validators';
import { apiUrl } from '@/constant/api-url';
import { appRouters } from '@/constant/app-routers';
import Layout from '@/layout/Main';
import { ValidatorResponse } from '@/models/validators';
import Seo from '@/shared/Seo';

export default function Validators() {
  const { t } = useTranslation();
  const { data: Validators, isFetching } = useGetValidators();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = Validators?.filter((item: ValidatorResponse) =>
    item.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Layout>
        <Seo templateTitle={t('page.validators')} />
        <div className='main font-Quantico bg-black px-[100px]'>
          <PageTitle>Validators List</PageTitle>
          <div className='flex justify-between items-center p-[10px] bg-purple-10 w-[450px] rounded-[20px] mx-auto my-[20px]'>
            <span className='text-gray-300 text-[16px] font-bold'>Search a Validator</span>
            <input
              type="text"
              placeholder="Search by address"
              value={searchTerm}
              onChange={handleSearchChange}
              className='text-black w-[270px] p-[10px] rounded-[20px]'
            />
          </div>
          <div className='top-list py-[10px] text-white'>
            <table className='w-full table-auto border-gray-200 mb-[20px]'>
              <thead>
                <tr className='bg-purple-20 custom-clip-path h-[50px] px-[20px]'>
                  <th className='w-20 text-center'>Address</th>
                  <th className='w-1/5 text-center'>Moniker</th>
                  <th className='w-[10px] text-center'>Voting power</th>
                  <th className='w-20 text-center'>Proposer priority</th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.map((item: any, index: number) => (
                    <tr key={index}
                      className={clsxm('w-full border-gray-5 00 my-1 h-[50px] border-b', { 'bg-purple-20': index % 2 !== 0 })}
                  >
                      <td className='text-center w-1/3'>
                      <Link href={`${appRouters.VALIDATORS}/${item.address}`} className='w-[100px] text-center px-[20px] underline'>
                          <MiddleEllipsisText text={item.address} />
                        </Link>
                      </td>
                    <td className='text-center w-1/3'>
                      <MiddleEllipsisText text={item.moniker} />
                    </td>
                    <td className='text-center w-[20px]'>
                      {item.voting_power}
                    </td>
                    <td className='text-center'>{item.proposer_priority}</td>
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

  await queryClient.prefetchQuery([apiUrl.VALIDATORS]), () => getValidators();

  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common', 'home']))),
      // Will be passed to the page component as props
      dehydratedState: dehydrate(queryClient),
    },
  };
};

