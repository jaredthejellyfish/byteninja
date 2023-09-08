'use client';

import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { githubDarkInit } from '@uiw/codemirror-theme-github';
import { Delete, Hourglass, PlayCircle } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { WebContainer } from '@webcontainer/api';

import Terminal from './terminal';

function MDIde() {
  const [webContainerInstance, setWebContainerInstance] =
    useState<WebContainer | null>(null);
  const [isBooting, setIsBooting] = useState<boolean>(true);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const codeRef = useRef<ReactCodeMirrorRef>(null);
  const [output, setOutput] = useState<string>('');

  useEffect(() => {
    async function boot() {
      if (isBooting === false) return;
      try {
        let instance = webContainerInstance;
        if (instance === null) {
          instance = await WebContainer.boot();
          setWebContainerInstance(instance);
        }
      } catch (e) {
        setIsBooting(false);
        if (e instanceof Error && e.message !== 'WebContainer already booted')
          console.log(e);
        else
          setOutput('WebContainer already booted, \nskipping boot process...');
      }
      try {
        if (!webContainerInstance) return;

        await webContainerInstance.mount({
          'package.json': {
            file: {
              contents: `
{
  "name": "example-app",
  "type": "module",
  "dependencies": {
    "next": "13.4.19",
    "next-auth": "^4.23.1",
    "next-mdx-remote": "^4.4.1",
    "next-redux-wrapper": "^8.1.0",
    "next-themes": "^0.2.1",
    "postcss": "8.4.28",
    "prism-react-renderer": "^2.0.6",
    "prisma": "^5.2.0"
  },
  "scripts": {
    "start": "node index.js"
  }
}`,
            },
          },
        });

        const installProcess = await webContainerInstance.spawn('npm', [
          'install',
        ]);

        console.log(installProcess);

        await installProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              setOutput((prev) => data + prev);
            },
          }),
        );

        setIsBooting(false);
        return installProcess.exit;
      } catch (e) {
        setIsBooting(false);
        console.log(e);
      }
    }

    if (!webContainerInstance) boot();

    return () => {
      try {
        if (webContainerInstance !== null) webContainerInstance.teardown();
      } catch (e) {
        if (
          e instanceof Error &&
          e.message !== 'WebContainer already torn down'
        )
          throw e;
      }
    };
  }, [isBooting, webContainerInstance]);

  const reset = async () => {
    if (webContainerInstance === null) return;
    webContainerInstance.teardown();
    setWebContainerInstance(null);
    setIsBooting(true);
    setOutput('');
  };

  const handleSubmit = async () => {
    if (webContainerInstance === null) return;
    await webContainerInstance.mount({
      'index.js': {
        file: {
          contents: codeRef.current?.view?.state.doc.toString() || '',
        },
      },
    });
    setIsRunning(true);
    const userProcess = await webContainerInstance.spawn('node', ['index.js']);
    setIsRunning(false);
    setOutput('');

    await userProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          setOutput((prev) => prev + data);
        },
      }),
    );
  };

  return (
    <div className="flex flex-col dark:bg-neutral-950 p-3 gap-2 rounded-lg border">
      <div className="flex flex-row gap-2 justify-between px-1 sm:text-lg">
        <span className="justify-self-start font-semibold">Python ex. 1</span>
        <div className="flex flex-row items-center dark:text-neutral-300 text-neutral-600 gap-3">
          <button onClick={() => reset()}>
            <Delete />
          </button>
          <button
            disabled={isBooting || isRunning}
            onClick={() => handleSubmit()}
            className="w-6  justify-self-end"
          >
            {!isBooting && !isRunning && <PlayCircle />}
            {(isBooting || isRunning) && <Hourglass />}
          </button>
        </div>
      </div>
      <div className="flex flex-row gap-2 max-h-[300px]">
        <CodeMirror
          className="w-full rounded h-full"
          placeholder={'Please enter JS code.'}
          lang="javascript"
          theme={githubDarkInit({
            settings: {
              fontFamily: 'monospace',
            },
          })}
          ref={codeRef}
        />
        <Terminal output={output} />
      </div>
    </div>
  );
}

export default MDIde;
