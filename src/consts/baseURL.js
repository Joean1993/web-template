export const devBaseURL = 'https://kunlun-manager-cn-dev.changdu.ltd'
export const testBaseURL = 'https://kunlun-manager-cn-test1.changdu.ltd'
export const prodBaseURL = 'https://kunlun-api.changdu.vip'

export const kongDevBaseURL = 'https://kunlun-kong-cn-dev.changdu.ltd'
export const kongTestBaseURL = 'https://kunlun-kong-cn-test1.changdu.ltd/'
export const kongProdBaseURL = 'https://kunlun-kong.changdu.vip'

export const devPodTerminalWs = 'wss://kunlun-websocket-cn-dev.changdu.ltd'
export const testPodTerminalWs = 'wss://kunlun-websocket-cn-test1.changdu.ltd'
export const prodPodTerminalWs = 'wss://kunlun-websocket.changdu.vip'

// 当前环境使用的url地址
export default (() => {
	let baseURL = prodBaseURL
	let kongBaseURL = kongProdBaseURL
	let podTerminalWs = prodPodTerminalWs

	if (location.href.includes('-dev.') || location.href.includes(':8080')) {
		baseURL = devBaseURL
		kongBaseURL = kongDevBaseURL
		podTerminalWs = devPodTerminalWs
	}

	if (location.href.includes('-test.')) {
		baseURL = testBaseURL
		kongBaseURL = kongTestBaseURL
		podTerminalWs = testPodTerminalWs
	}

	return {
		baseURL,
		kongBaseURL,
		podTerminalWs,
	}
})()
