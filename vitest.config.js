import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,  // <-- 让 describe/it/expect 变成全局变量
    },
})
