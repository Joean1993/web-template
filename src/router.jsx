import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Layout from '@/layouts/index'
import Home from '@/pages/home/index'

export default [
	{
		path: '/web',
		element: <Layout />,
		children: [
			{
				path: '',
				element: <Navigate to="/web/home" replace />,
			},
			{
				path: 'home',
				element: <Home />,
			},
		],
	},
]
