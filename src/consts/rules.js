import useCommonStore from '@/store'

export const required = { required: true, message: '${label} 不能为空' }

export const requiredInput = { required: true, type: 'string', whitespace: true, message: '${label} 不能为空' }

export const phone = {
	pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
	message: '请检查手机号码',
}
export const email = {
	pattern: /^[A-Za-z0-9\u4e00-\u9fa5_]+@[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(?:\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/,
	message: '请检查邮箱格式',
}
export const number = {
	pattern: /^[0-9]*$/,
	message: '请输入数字',
}

export const url = {
	pattern:
		/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/,
	message: '请检查输入地址',
}

export const domain = {
	pattern: /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(?:\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/,
	message: '请检查输入域名',
}

export const gitlabTag = {
	pattern:
		// eslint-disable-next-line max-len
		/^(dev|test|release|hotfix)_(?:(?!0000)[0-9]{4}(?:(?:0[13578]|1[02])(?:0[1-9]|[12][0-9]|3[01])|(?:0[469]|11)(?:0[1-9]|[12][0-9]|30)|02(?:0[1-9]|1[0-9]|2[0-8]))|(?:(((\d{2})(0[48]|[2468][048]|[13579][26])|(([02468][048])|([13579][26]))00))0229))_(\d{2})$/,
	message: '请遵循tag规范，详见 https://docs.changdu.vip/pages/viewpage.action?pageId=33302204',
	warningOnly: true,
}

/**
 * Form.List 用的验重Rule
 * @params listKey: list绑定的formName
 * @params fieldKey: list对象中要验重的key值
 * @params index: 当前校验对象字段在list中的索引
 * @params message: 报错文案
 * @return Rule
 * @example repeat('formList', 'fieldKey', 2, '重了，快改')
 */
export const repeat =
	(listKey, fieldKey, index, message = '重复选中，请修改') =>
		({ getFieldValue }) => ({
			validator(_, value) {
				const list = getFieldValue(listKey)
				const isRepeat = list.some(
					({ [fieldKey]: itemValue }, itemIndex) => itemValue && itemValue === value && itemIndex < index
				)

				if (!isRepeat) {
					return Promise.resolve()
				}

				return Promise.reject(new Error(message))
			},
		})

export const penNameZN = {
	pattern: /^[\u4E00-\u9FA5a-zA-Z0-9]+$/,
	message: '笔名要求汉字/英文/数字',
}
export const penNameEN = {
	pattern: /^[a-zA-Z0-9]+$/,
	message: '英文笔名要求英文/数字',
}
export const qq = {
	pattern: /^[1-9][0-9]{4,10}$/,
	message: '请检查QQ号格式',
}
export const count = (min = 0, max = Infinity) => ({ min, max })

export const username = {
	pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/,
	message: '用户名需为英文+数字的组合',
}

export const password = {
	pattern:
		/^(?![0-9]+$)(?![A-Za-z]+$)(?![_]+$)(?!.*[\u4E00-\u9FA5\uF900-\uFA2D])(?!^[!@#$%^&*()_+=\\[\\]{}|;:',.<>\/-?"·~\$`!\^"()#]+?$)[\S]{8,20}$/,
	message: '请设置8-20位的密码，由英文、数字或字符至少包含2种的组合',
}

export const projectName = {
	pattern: /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/,
	message: '必须以小写字母或数字开头,可以包含小写字母、数字或短横线（-）,结尾必须是小写字母或数字',
}

export const namespace = {
	pattern: /^[a-z]([-a-z0-9]*[a-z0-9])?$/,
	message: '必须以小写字母开头,可以包含小写字母、数字或短横线（-）,结尾必须是小写字母或数字',
}

export const moduleName = {
	pattern: /^[a-zA-Z0-9-_]+$/,
	message: '仅支持字母、数字、下划线及中划线',
}

/**
 * 检测git中是否存在分支/commitId/tag
 * @params projectId: 应用id，用来获取gitlab地址
 * @params versionType: 部署类型 1-commitId 2-tag 4-cos
 * @params message: 报错文案
 * @return Rule
 * @example checkGitExist('1725481368630202368', '1', 'gitlab里没有这玩意，别瞎写，快改')
 */
export const checkGitExist =
	(projectId, versionType, message = '校验失败，请修改') =>
		() => ({
			async validator(_, value) {
				if (value) {
					const handleValidateVersionExist = useCommonStore.getState().handleValidateVersionExist
					const data = await handleValidateVersionExist(projectId, versionType, value)

					// 校验通过，返回通过结果
					if (data?.result) {
						return Promise.resolve()
					}

					// 校验不通过
					return Promise.reject(new Error(data?.errMsg || message))
				}

				return Promise.resolve()
			},
		})

/**
 * 空格检测结果
 */
export const checkWhiteSpace = {
	validator(_, value) {
		if (value.includes(' ')) {
			return Promise.reject(new Error('不允许输入空格'))
		}

		return Promise.resolve()
	},
}
