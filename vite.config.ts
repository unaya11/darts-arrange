import { defineConfig } from 'vite';

export default defineConfig(() => {
  const prNumber = process.env.PR_NUMBER;
  const repoName = 'darts-arrange';
  const base = prNumber ? `/${repoName}/previews/pr-${prNumber}/` : `/${repoName}/`;

  return {
    base: base,
    test: {
      environment: 'happy-dom',
      setupFiles: ['./vitest-setup.ts'],
      globals: true,
      coverage: {
        provider: 'v8' as 'v8',
        reporter: ['text', 'html'] as any[],
      },
    },
  };
});
