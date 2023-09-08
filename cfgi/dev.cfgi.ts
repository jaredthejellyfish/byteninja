import { task, command, runs, commandLive, TaskConfig } from 'cfgi';

const options: TaskConfig = { silent: false,  };

task(
  'dev',
  () => {},
  [
    runs('Prettier', () => {
      command('pnpm prettier --write .');
    }),

    runs('Prisma Generate', () => {
      command('pnpm prisma generate');
    }),

    runs('TSC Checks', () => {
      command('pnpm tsc');
    }),

    runs('Remove TSBuildinfo', () => {
      command('rm -rf tsconfig.tsbuildinfo');
    }),

    runs('Delete old .next folder', () => {
      command('rm -rf .next');
    }),

    runs('Next Development Server', () => {
      commandLive('pnpm next dev');
    }),
  ],
  options,
);
