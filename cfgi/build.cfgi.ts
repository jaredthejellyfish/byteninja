import { task, command, runs, commandLive, TaskConfig } from 'cfgi';

const options: TaskConfig = { silent: false, exclude: 'none' };

task(
  'dev',
  () => {},
  [
    runs('Contentlayer', () => {
      command('pnpm contentlayer build');
    }),

    runs('Prettier', () => {
      command('pnpm prettier --write .');
    }),

    runs('Prisma Generate', () => {
      command('pnpm prisma generate');
    }),

    runs('TSC Checks', () => {
      command('pnpm tsc --noEmit --strict');
    }),

    runs('Remove TSBuildinfo', () => {
      command('rm -rf tsconfig.tsbuildinfo');
    }),

    runs('Next Build', () => {
      commandLive('pnpm next build');
    }),
  ],
  options,
);
