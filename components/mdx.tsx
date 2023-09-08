import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import * as React from 'react';
import { Code } from 'bright';
import Link from 'next/link';

import { barnCatThemeSSR } from '@/lib/codeTheme';
import { cn } from '@/lib/utils/cn';

interface MdxProps {
  source: string;
}

const components = {
  h1: ({ className, ...props }: { className: string }) => (
    <h1
      className={cn(
        'mt-2 scroll-m-20 text-4xl font-bold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: { className: string }) => (
    <h2
      className={cn(
        'mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0',
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: { className: string }) => (
    <h3
      className={cn(
        'mt-8 scroll-m-20 text-2xl font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: { className: string }) => (
    <h4
      className={cn(
        'mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: { className: string }) => (
    <h5
      className={cn(
        'mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: { className: string }) => (
    <h6
      className={cn(
        'mt-8 scroll-m-20 text-base font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, href, ...props }: { className: string; href: string }) => (
    <Link
      href={href}
      className={cn('font-medium underline underline-offset-4', className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: { className: string }) => (
    <p
      className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: { className: string }) => (
    <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }: { className: string }) => (
    <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
  ),
  li: ({ className, ...props }: { className: string }) => (
    <li className={cn('mt-2', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: { className: string }) => (
    <blockquote
      className={cn(
        'mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground',
        className,
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn('rounded-md border', className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn('w-full', className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn('m-0 border-t p-0 even:bg-muted', className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: { className: string }) => (
    <th
      className={cn(
        'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: { className: string }) => (
    <td
      className={cn(
        'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  pre: Code,
  Image,
  Link,
};

Code.theme = barnCatThemeSSR;

export async function Mdx({ source }: MdxProps) {
  return (
    <MDXRemote
      // @ts-expect-error the type for the tags is off on this one
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [
            // Adds support for GitHub Flavored Markdown
            remarkGfm,
          ],
          // These work together to add IDs and linkify headings
          rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
        },
      }}
      source={source}
    />
  );
}
