import { match } from 'pinyin-pro'

export default (inputValue, label = '') => {
	const trimValue = inputValue?.trim() || ''

	if (!trimValue) {
		return true
	}

	const matchWord = label.includes(trimValue)
	const matchLetter = match(label, trimValue, { continuous: true })

	return matchWord || matchLetter
}
