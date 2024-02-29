import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import Layout from '@/layout/Main';

export default function NotFoundPage() {
  return (
    <Layout>
      <main>
        <h1 className='mt-8 text-4xl md:text-6xl'>Page Not Found</h1>
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common']))),
    },
  };
};
