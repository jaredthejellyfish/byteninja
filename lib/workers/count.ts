/* eslint-disable no-restricted-globals */

self.onmessage = (e: MessageEvent<string>) => {
  if (e.data) {
    self.postMessage(e);
  }
};

export {};
