import axios from 'axios'
import { message as Message } from 'antd'
import urls from '@/consts/baseURL'

const { baseURL } = urls

const request = axios.create({ timeout: 30000 })

request.defaults.baseURL = baseURL

request.interceptors.request.use(
	async config => {
		config.headers.accessToken = localStorage.getItem('token')

		return config
	},
	error => {
		return Promise.reject(error)
	}
)

request.interceptors.response.use(
	response => {
		const { code, data, message } = response?.data || {}
		const status = code === 200

		if (code == 9998) {
			return { data: null, status: false }
		}

		if (!status) {
			Message.error(message || '请求异常')

			return { status: false }
		}

		return { data, status }
	},
	err => {
		Message.error('请求异常')

		return { status: false }
	}
)

export default request
