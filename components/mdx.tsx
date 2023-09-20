import { useMDXComponent } from 'next-contentlayer/hooks';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Image from 'next/image';
import * as React from 'react';
import Link from 'next/link';

import { barnCatThemeSSR } from '@/lib/codeTheme';
import Collapsible from './collapsible-section';
import YoutubeEmbed from './youtube-embed';
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

  pre: ({ ...props }) => (
    <Code
      theme={{
        dark: barnCatThemeSSR,
        light: 'min-light',
        // using a different CSS selector:
        // lightSelector: '[data-theme="light"]',
        lightSelector: 'html.light',
      }}
      {...props}
    />
  ),

  YoutubeEmbed,

  Collapsible,
};

function LoaingSpinner() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div
        className="inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}

export async function Mdx({ source }: MdxProps) {
  const Content = useMDXComponent(source);

  return (
    <Suspense fallback={<LoaingSpinner />}>
      <article className="prose prose-neutral dark:prose-invert max-w-none prose-h1:leading-normal px-7">
        {/* @ts-expect-error typing of a element is incompatible */}
        <Content components={components} />
      </article>
    </Suspense>
  );
}
