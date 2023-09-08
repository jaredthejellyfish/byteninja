import ColorHash from 'color-hash';
import * as React from 'react';

const colorHash = new ColorHash();

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
}

function Badge({ content }: BadgeProps) {
  const backgroundColor = colorHash.hex(content);

  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      {content}
    </div>
  );
}

export { Badge };
