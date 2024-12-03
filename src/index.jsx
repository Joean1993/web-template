import React from 'react'
import { createRoot } from 'react-dom/client'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import App from '@/App'

dayjs.locale('zh-cn')

const root = document.getElementById('root')

root && createRoot(root).render(<App />)
