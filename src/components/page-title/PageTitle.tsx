import * as React from 'react';

import clsxm from '@/lib/clsxm';

type PageTitleProps = React.ComponentPropsWithoutRef<'div'>;

export default function PageTitle({ children, className, ...rest }: PageTitleProps) {
  return (
    <div className={clsxm(['flex-center relative overflow-hidden h-[100px] pt-[40px]', className])} {...rest}>
      <div className='bg-section-title absolute inset-0'></div>
      <h1 className='text-shadow-stroke shadow-purple text-center text-[36px] font-black text-white'>
        {children}
      </h1>
    </div>
  );
}
