import type { Handle } from '@sveltejs/kit'
import connectDB from '../db/connectDB'

export const handle: Handle = async ({ event, resolve }) => {
	// include dbConn object with requests
	const dbConn = await connectDB()
	event.locals.dbConn = dbConn

	// include authentication data with requests
	const token = event.cookies.get("token") || null
	event.locals.token = token

	const response = await resolve(event)
	dbConn.release()
	return response
}
