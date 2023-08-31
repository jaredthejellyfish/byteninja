import { task, command, runs, commandLive, TaskConfig } from 'cfgi';

const options: TaskConfig = { silent: false, exclude: 'none' };

task(
  'dev',
  () => {},
  [
    runs('Git Add', () => {
      command('git add .');
    }),

    runs('Commit messge and commit', () => {
      commandLive(
        'read -p "Please enter your name: " username && echo "Hello, $username!"',
      );
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
