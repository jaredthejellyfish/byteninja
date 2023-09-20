'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

type Props = {
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
};

const ReadingTime = (props: Props) => {
  const isMobile = () => {
    if (window.innerWidth <= 640) {
      return true;
    } else {
      return false;
    }
  };
  const [isClosed, setIsClosed] = useState(isMobile());
  const { readingTime } = props;

  return (
    <div
      className="absolute right-10 bg-black p-3 rounded-xl cursor-pointer"
      onClick={() => setIsClosed(true)}
      hidden={isClosed}
    >
      <div className="text-white text-sm">{readingTime.text}</div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(ReadingTime), {
  ssr: false,
});
