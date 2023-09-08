import { Highlight, PrismTheme, themes } from 'prism-react-renderer';
import { useTheme } from 'next-themes';
import React from 'react';

import { barnCatTheme } from '@/lib/codeTheme';

type Props = {
  output: string;
};

function stripAnsiCodes(input: string) {
  const ansiRegex = /(\u001b\[[0-9;]+m)/g;
  return input.replace(ansiRegex, '');
}

const Terminal = (props: Props) => {
  const { output } = props;
  const { theme } = useTheme();

  const cleanOutput = stripAnsiCodes(output);

  return (
    <Highlight
      code={cleanOutput}
      language="shell"
      theme={theme === 'dark' ? barnCatTheme : themes.github}
    >
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <div
          style={style}
          className="px-4 py-2 border dark:border-neutral-800 rounded w-full overflow-scroll min-h-[10em]"
        >
          <pre className="text-sm">
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        </div>
      )}
    </Highlight>
  );
};

export default Terminal;
