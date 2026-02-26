import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/selfcheck/',
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,  // 让 less 可以处理 antd 的 JavaScript 内联样式
        modifyVars: {              // 如果你想自定义 antd 主题，可以在这里修改变量
          // '@primary-color': '#1DA57A',
        },
      },
    },
  },
})