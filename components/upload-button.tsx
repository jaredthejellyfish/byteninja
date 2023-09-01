'use client';
/* eslint-disable */

import React, { useState } from 'react';

import { useUploadThing } from '@/lib/utils/uploadthing';

type Props = {
  onUploadComplete?: () => void;
  onUploadError?: (error: unknown) => void;
};

function UploadButton(props: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { startUpload, isUploading, permittedFileInfo } = useUploadThing(
    'profileImage',
    {
      onClientUploadComplete: (file) => {
        if (props.onUploadComplete) {
          props.onUploadComplete();
          return;
        }

        console.log('Upload complete', file);
      },
      onUploadProgress: (progress: number) => {
        setUploadProgress(progress);
      },

      onUploadError: (error) => {
        props.onUploadError
          ? props.onUploadError(error)
          : console.log('Upload error', error);
      },
    },
  );

  return <div>UploadButton</div>;
}

export default UploadButton;
/* eslint-enable */
