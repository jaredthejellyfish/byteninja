import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <section className="h-screen">
      <div className="h-screen flex items-center justify-center">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-neutral-900 md:text-4xl dark:text-white">
            Something&apos;s missing.
          </p>
          <p className="mb-4 text-lg font-light text-neutral-500 dark:text-neutral-400">
            Sorry, we can&apos;t find that page. You&apos;ll find lots to do tho
            so head to the home page and keep on.
          </p>
          <Link
            href="/"
            className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
          >
            Take me home
          </Link>
        </div>
      </div>
    </section>
  );
}
