import zhCN from 'antd/locale/zh_CN'

export default {
	theme: {
		token: {
			colorPrimary: '#06f',
			colorWarning: '#D39645',
			colorSuccess: '#67C23A',
			colorError: '#ff3787',
			colorBorder: '#ebedef',
			borderRadius: 4,
			colorLink: '#06f',
			colorLinkHover: '#3399FF',
			colorPrimaryBg: '#F6F7FB',
			screenXXL: 1681,
		},
		components: {
			Layout: { bodyBg: '#fff' },
			Menu: {
				itemColor: '#4a4a4a',
				itemBorderRadius: 6,
				itemSelectedColor: '#06f',
				itemSelectedBg: '#e6edfb',
				itemHoverColor: '#06f',
				itemHoverBg: '#e6edfb',
				iconSize: 22,
				iconMarginInlineEnd: 10,
				groupTitleFontSize: 14,
			},
		},
	},
	form: { validateMessages: { required: '${label}不能为空' } },
	locale: zhCN,
}
