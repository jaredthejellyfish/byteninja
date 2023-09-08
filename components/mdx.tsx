import { useMDXComponent } from 'next-contentlayer/hooks';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Image from 'next/image';
import * as React from 'react';
import Link from 'next/link';

import { barnCatThemeSSR } from '@/lib/codeTheme';
import { cn } from '@/lib/utils/cn';

const Code = dynamic(() => import('bright').then((mod) => mod.Code), {
  ssr: false,
});

interface MdxProps {
  source: string;
}

const components = {
  a: ({ className, href, ...props }: { className?: string; href: string }) => (
    <Link
      href={href}
      className={cn('font-medium underline underline-offset-4', className)}
      {...props}
    />
  ),

  Image: ({
    className,
    alt,
    width,
    src,
    height,
    placeholder = 'empty',
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & {
    alt: string;
    className?: string;
    src: string;
    width: number;
    height: number;
    placeholder?: 'blur' | 'empty';
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <Image
      className={cn('rounded-md border', className)}
      alt={alt!}
      src={src!}
      width={width}
      height={height}
      placeholder={placeholder}
      {...props}
    />
  ),

  pre: ({ ...props }) => <Code theme={barnCatThemeSSR} {...props} />,
  // Terminal: dynamic(() =>
  //   import('@/components/terminal').then((mod) => mod.Terminal),
  // ),
};

export async function Mdx({ source }: MdxProps) {
  const Content = useMDXComponent(source);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <article className="prose prose-neutral dark:prose-invert max-w-none prose-h1:leading-normal px-7">
        {/* @ts-expect-error issue with MDXComponent type */}
        <Content components={components} />
      </article>
    </Suspense>
  );
}
