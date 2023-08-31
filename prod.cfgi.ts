import { task, command, runs, commandLive, TaskConfig } from 'cfgi';

const options: TaskConfig = { silent: false, exclude: 'none' };

task(
  'dev',
  () => {},
  [
    runs('Git Add', () => {
      command('git add .');
    }),

    runs('Commit baby commit!', () => {
      commandLive('npx commitgpt');
    }),
  ],
  options,
);
