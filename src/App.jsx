import React from 'react'
import { App, ConfigProvider } from 'antd'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import antdConfig from '@/consts/antd'
import '@/assets/styles/index.scss'
import routes from './router'

const router = createBrowserRouter(routes)
const MyApp = () => {
	return (
		<ConfigProvider {...antdConfig}>
			<App style={{ height: '100%' }}>
				<RouterProvider router={router} />
			</App>
		</ConfigProvider>
	)
}

export default MyApp
