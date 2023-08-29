import { cn } from '@/lib/utils/cn';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse',
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
