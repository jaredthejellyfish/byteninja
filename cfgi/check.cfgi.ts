import { task, command, runs, commandLive, TaskConfig } from 'cfgi';

const options: TaskConfig = { silent: false, exclude: 'none' };

task(
  'dev',
  () => {},
  [
    runs('Contentlayer', () => {
      command('pnpm contentlayer build');
    }),

    runs('Prisma Generate', () => {
      command('pnpm prisma generate');
    }),

    runs('Prettier', () => {
      commandLive('echo "Running Prettier..."');
    }),

    runs('ESLint', () => {
      commandLive('pnpm eslint --fix .');
    }),

    runs('TSC Checks', () => {
      commandLive('pnpm tsc-checks');
      command('rm -rf tsconfig.tsbuildinfo', true);
    }),
  ],
  options,
);
