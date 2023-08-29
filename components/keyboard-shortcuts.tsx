'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import React from 'react';

const KeyboardShortcuts = () => {
  const router = useRouter();

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === ' ' && event.metaKey) {
        event.preventDefault(); // Prevent the default action
      }

      if (event.key === 's' && event.metaKey) {
        event.preventDefault(); // Prevent the default action
        router.push('/settings');
      }

      if (event.shiftKey && event.metaKey && event.key === 'p') {
        event.preventDefault(); // Prevent the default action
        router.push('/dashboard');
      }

      if (event.shiftKey && event.metaKey && event.key === 'o') {
        event.preventDefault(); // Prevent the default action
        signOut();
      }
      if (event.shiftKey && event.metaKey && event.key === 'h') {
        event.preventDefault(); // Prevent the default action
        router.push('/');
      }
    },
    [router],
  );

  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return <></>;
};

export default KeyboardShortcuts;
