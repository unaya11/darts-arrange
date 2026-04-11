import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig(() => {
  const prNumber = process.env.PR_NUMBER;
  const repoName = 'darts-arrange';
  const base = prNumber ? `/${repoName}/previews/pr-${prNumber}/` : `/${repoName}/`;

  return {
    base: base,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      sourcemap: false,
    },
    test: {
      environment: 'node',
      globals: true,
      coverage: {
        provider: 'v8' as const,
        reporter: ['text', 'html'],
      },
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/e2e/**',
        '**/coverage/**',
        '**/.{idea,git,cache,output,temp}/**',
      ],
    },
  };
});
