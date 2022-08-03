import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import { resolve  } from 'path'

import poscssImport from 'postcss-import'
import autoprefixer from 'autoprefixer'

const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir)
}

const alias: Record<string, string> = {
  '@': pathResolve('src'),
  '~': pathResolve('src/styles')
}

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  console.log('command, mode：', command, mode)
  const isDev = command != 'build'
  return {
    plugins: [vue()],
    base: isDev ? './' : '/app/', // 开发或生产环境服务的公共基础路径
    // publicDir: '/', // 静态资源服务的文件夹
    server: {
      host: '0.0.0.0',
      port: 5173,
      open: true,
      https: false,
      proxy: {
        '/api': {
          target: 'https://www.baidu.com',
          changeOrigin: true,
          rewrite: (path) => {
            return path.replace(/^\/api/, '')
          },
        }
      }
    },
    resolve: {
      alias
    },
    css: {
      postcss: {
        plugins: [
          poscssImport,
          autoprefixer
        ]
      },
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/common.scss";'
        }
      }
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      },
      terserOptions: {
        compress: {
          drop_console: isDev,
          drop_debugger: isDev
        }
      }
    }
  }
})
