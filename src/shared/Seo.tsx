import Head from 'next/head';

const defaultMeta = {
  title: 'Namada Explorer',
  description: 'Namada Explorer',
  siteName: 'Namada Explorer',
};

type SeoProps = {
  date?: string;
  templateTitle?: string;
} & Partial<typeof defaultMeta>;

export default function Seo(props: SeoProps) {
  const meta = {
    ...defaultMeta,
    ...props,
  };
  meta['title'] = props.templateTitle ? `${props.templateTitle} | ${meta.siteName}` : meta.title;

  return (
    <Head>
      <title>{meta.title}</title>
      <meta content={meta.description} name='description' />
    </Head>
  );
}

