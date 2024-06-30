import { error } from '@sveltejs/kit'
import { getReasonPhrase, getStatusCode } from 'http-status-codes'

export default (condition: boolean, code: number, reason?: string) => {
	if (condition) {
		error(code, {
			message: getReasonPhrase(code),
			reason
		})
	}
}
