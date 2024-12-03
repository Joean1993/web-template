import { create } from 'zustand'
import request from '@/utils/request'

export default create(set => ({
	data: 'Hello World',

	// 获取cdn刷新列表
	handleChangeData: () => {
		set(() => ({ data: 'Hello World Again' }))
	}
}))
