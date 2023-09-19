'use client';

import React from 'react';

import CollapsibleSection from '@/components/collapsible-section';
import PageContainer from '@/components/page-container';
import YoutubeEmbed from '@/components/youtube-embed';
import MDIde from '@/components/md-ide';
import XTerm from '@/components/xterm';

// Render the component

type Props = {};

const Tests = (props: Props) => {
  return (
    <PageContainer>
      <CollapsibleSection initiallyOpen title="Hello, world!">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio nesciunt
        dolores tempora quidem non quas, debitis mollitia, eaque quae dolor eum
        minima pariatur rerum amet dignissimos, dicta architecto vitae
        doloribus?
      </CollapsibleSection>
    </PageContainer>
  );
};

export default Tests;
