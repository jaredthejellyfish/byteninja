'use client';

import YouTube, { YouTubeProps } from 'react-youtube';
import dynamic from 'next/dynamic';
import React from 'react';

import { cn } from '@/lib/utils/cn';

type Props = {
  videoId: string;
  title?: string;
  footer?: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  color?: string;
  controls?: boolean;
  autoplay?: boolean;
  disablekb?: boolean;
  captions?: boolean;
  enableFullscreen?: boolean;
};

const YoutubeEmbedSkeleton = () => {
  return (
    <div className="w-full h-[360px] -mb-8 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
  );
};

const YoutubeEmbed = (props: Props) => {
  const { title, footer } = props;

  const opts: YouTubeProps['opts'] = {
    width: '100%',
    playerVars: {
      color: props.color || 'white',
      constrols: props.controls ? 1 : 0,
      autoplay: props.autoplay ? 1 : 0,
      disablekb: props.disablekb ? 1 : 0,
      cc_load_policy: props.captions ? 1 : 0,
      fs: props.enableFullscreen ? 1 : 0,
    },
  };
  return (
    <>
      <h3>{title}</h3>
      <div className={cn('w-full h-[360px] -mb-8', props.className)}>
        <YouTube videoId={props.videoId} opts={opts} />
      </div>
      <p>{footer}</p>
    </>
  );
};

export default dynamic(() => Promise.resolve(YoutubeEmbed), {
  ssr: false,
  loading: () => <YoutubeEmbedSkeleton />,
});
