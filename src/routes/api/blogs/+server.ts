import { error, type RequestHandler, type RequestEvent } from '@sveltejs/kit';

export const POST: RequestHandler = async (reqEvt: RequestEvent) => {
	const { locals, request } = reqEvt
	let body = await request.json()
	const { dbConn } = locals
	await dbConn.query(
		"INSERT INTO BlogPost (title, content, publishedDate) VALUES ($1, $2, NOW())",
		[ body.title, body.content ],
	)
	return new Response("Created!")	
}

