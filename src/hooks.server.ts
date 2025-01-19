import type { Handle } from '@sveltejs/kit'
import connectDB from '../db/connectDB'
import jwt from "jsonwebtoken"

export const handle: Handle = async ({ event, resolve }) => {
	// include dbConn object with requests
	const dbConn = await connectDB()
	event.locals.dbConn = dbConn

	// include authentication data with requests
	const token = event.cookies.get("token") || null
	if (token && jwt.verify(token, process.env.JWT_SECRET || "jwt_secret") === process.env.JWT_SIGNED_MESSAGE) {
		event.locals.token = token
		event.locals.priviledged = true
	}

	const response = await resolve(event)
	dbConn.release()
	return response
}
