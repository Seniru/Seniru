import { error, type RequestHandler, type RequestEvent } from '@sveltejs/kit';

export const GET: RequestHandler = async (req: RequestEvent) => {
	const { dbConn } = req.locals;
	return new Response("testing blog" + req.params.blog)	
}

