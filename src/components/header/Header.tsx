import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import NamadaLogo from 'public/svg/logo.png';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import { appRouters } from '@/constant/app-routers';
import UnstyledLink from '@/shared/links/UnstyledLink';
import NextImage from '@/shared/NextImage';

export default function Header() {
  const { t } = useTranslation();
  const links = [
    { href: appRouters.HOME, label: t('page.home') },
    { href: appRouters.VALIDATORS, label: t('page.validators') },
    { href: appRouters.BLOCKS, label: t('page.blocks') },
    { href: appRouters.TRANSACTIONS, label: t('page.transactions') },
  ];

  const router = useRouter();
  const isActiveRouter = (currentRouter: string) => {
    return router.pathname === currentRouter || router.pathname.startsWith(`${currentRouter}/`);
  };

  return (
    <>
      <header className='top-0 z-10 bg-black md:z-50 sticky '>
        <div className='layout md mx-auto flex items-center justify-between px-[10px] md:h-[80px] md:pr-[144px]'>
          <NextImage src={NamadaLogo} alt='Try' className='w-[200px]' />
        </div>
      </header>

      <nav className='md:sticky bg-yellow-10 z-40 hidden md:top-[80px] md:block md:h-fit md:rounded-none md:opacity-100'>
        <ul className='flex flex-row items-center justify-center gap-0 p-1'>
          {links.map(({ href, label }) => (
            <React.Fragment key={`${href}${label}`}>
              <li className='relative w-[140px]'>
                <UnstyledLink
                  href={href}
                  className={clsxm(
                    'text-gray-700 block h-[50px] rounded-[10px] px-[10px] text-center text-base font-bold uppercase leading-[50px] hover:bg-gray-600 hover:text-white',
                    { 'bg-black text-white': isActiveRouter(href) },
                  )}
                >
                  {label}
                </UnstyledLink>
              </li>
              <div className='mx-[8px] block h-[20px] w-[1px] bg-black last:hidden' />
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </>
  );
}
