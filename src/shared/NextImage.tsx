import Image, { ImageProps } from 'next/image';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import UnstyledLink from '@/shared/links/UnstyledLink';

type NextImageProps = {
  useSkeleton?: boolean;
  blurClassName?: string;
  externalLink?: string;
} & ImageProps;

/**
 *
 * @description Must set width using `w-` className
 * @param useSkeleton add background with pulse animation, don't use it if image is transparent
 */
export default function NextImage({
  useSkeleton = false,
  src,
  width,
  height,
  alt,
  className,
  blurClassName,
  externalLink,
  ...rest
}: NextImageProps) {
  const [status, setStatus] = React.useState(useSkeleton ? 'loading' : 'complete');

  return (
    <>
      {externalLink ? (
        <UnstyledLink href={externalLink} openNewTab={!!externalLink}>
          <Image
            className={clsxm(className, status === 'loading' && clsxm('animate-pulse', blurClassName))}
            src={src}
            width={width}
            height={height}
            alt={alt}
            onLoadingComplete={() => setStatus('complete')}
            {...rest}
          />
        </UnstyledLink>
      ) : (
        <Image
          className={clsxm(className, status === 'loading' && clsxm('animate-pulse', blurClassName))}
          src={src}
          width={width}
          height={height}
          alt={alt}
          onLoadingComplete={() => setStatus('complete')}
          {...rest}
        />
      )}
    </>
  );
}
