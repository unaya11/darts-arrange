import { defineConfig } from 'vite';

export default defineConfig(() => {
  const prNumber = process.env.PR_NUMBER;

  const repoName = 'darts-arrange';

  const base = prNumber ? `/${repoName}/previews/pr-${prNumber}/` : `/${repoName}/`;

  return {
    base: base,
    // ...他の設定があれば残す
  };
});
