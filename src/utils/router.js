import router from '@/router'

/**
 * 根据路由ID获取路径名
 * @param id 路由ID
 */
export function getBreadcrumbItemsById(id, dicts) {
	if (!id) {
		return []
	}

	const ids = id.split('-')
	const result = []
	let routes = router

	while (ids.length) {
		const index = ids.shift()
		const currentRouter = typeof index === 'string' ? (routes[parseInt(index)]) : null

		if (currentRouter) {
			if (currentRouter.name) {
				const placeholder = dicts[currentRouter.name]

				result.push({
					key: placeholder || currentRouter.name,
					title: placeholder || currentRouter.name,
					className: placeholder ? 'color-danger font-bold' : '',
				})
			}
			routes = currentRouter.children
		}
	}

	return result
}
