import dayjs from 'dayjs'
import { TIME_FORMAT } from '@/consts'

// 日期时间格式化
export const formatDateTime = (time, timeFormat = TIME_FORMAT, errText = '-') => {
	if (time) {
		const dayObject = dayjs(time)

		if (dayObject.isValid()) {
			const formatString = dayjs(time).format(timeFormat)

			return formatString
		}
	}

	return errText
}

// 格式化时间间隔
export const formatTimeDuration = (timeArr, errText = '-') => {
	let timeDuration = timeArr

	if (typeof timeArr === 'object') {
		const [startTime, endTime] = timeArr.map(time => dayjs(time))

		if (startTime.isValid() && endTime.isValid()) {
			timeDuration = dayjs.duration(endTime.diff(startTime)).asMilliseconds()
		}
	}

	if (typeof timeDuration === 'number') {
		let formatStr = 'SSS 毫秒'

		if (timeDuration < 1000) {
			return `${timeDuration} 毫秒`
		}

		if (timeDuration >= 1000) {
			formatStr = 's 秒'
		}

		if (timeDuration >= 60000) {
			formatStr = `m 分钟 ${formatStr}`
		}

		if (timeDuration >= 3600000) {
			formatStr = `H 小时 ${formatStr}`
		}

		return dayjs.duration(timeDuration, 'milliseconds').format(formatStr)
	}

	return errText
}
