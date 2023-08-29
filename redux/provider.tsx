'use client';

import { Provider } from 'react-redux';
import React from 'react';

import { store } from './store';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
