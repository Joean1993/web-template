import { create } from 'zustand'
// import request from '@/utils/request'
import { message as Message } from 'antd'

export default create((set, get) => ({
	userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') || '') : null,
	isLogining: false,

	// 执行登录
	handleLogin: async () => {
		const { isLogining } = get()

		if (isLogining) {
			return
		} // 避免多个接口同时请求，会执行多次登录跳转

		Message.error('用户未登录')
	},

	// 执行登出
	handleLogout: async () => {
		localStorage.removeItem('token')
		localStorage.removeItem('userInfo')

		set(() => ({ userInfo: null }))
	}
}))
