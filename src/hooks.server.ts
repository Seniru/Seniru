import type { Handle } from '@sveltejs/kit';
import connectDB from '../db/connectDB'

export const handle: Handle = async ({event, resolve}) => {
    const dbConn = await connectDB()
    event.locals.dbConn = dbConn
    const response = await resolve(event)
    dbConn.release();
	return response
}
