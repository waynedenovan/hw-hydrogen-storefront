import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {reactRouter} from '@react-router/dev/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    hydrogen(),
    reactRouter(),
    tsconfigPaths(),
  ],
  build: {
    // Allow a strict Content-Security-Policy
    // withtout inlining assets as base64:
    assetsInlineLimit: 0,
    target: 'esnext',
  },
  ssr: {
    // Node built-ins used by the Express server / media resource route —
    // must not be bundled into the SSR build, just resolved at runtime.
    external: ['fs', 'path', 'stream', 'crypto', 'util'],
    optimizeDeps: {
      /**
       * Include dependencies here if they throw CJS<>ESM errors.
       * For example, for the following error:
       *
       * > ReferenceError: module is not defined
       * >   at /Users/.../node_modules/example-dep/index.js:1:1
       *
       * Include 'example-dep' in the array below.
       * @see https://vitejs.dev/config/dep-optimization-options
       */
      include: [
        'set-cookie-parser',
        'cookie',
        'react-router',
        '@react-router/node',
        '@react-router/express',
      ],
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5130,
    allowedHosts: ['.tryhydrogen.dev', '.ngrok-free.dev'],
    watch: {
      // media/suppliers is a symlink to ~41k product images (see
      // /media/suppliers/$.tsx) — watching it exhausts the OS's inotify
      // watch limit (ENOSPC) for no benefit, since these files never change
      // while the dev server is running.
      ignored: ['**/media/**'],
    },
  },
});
