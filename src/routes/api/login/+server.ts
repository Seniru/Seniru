import 'dotenv/config'

import { json, type RequestHandler } from "@sveltejs/kit";
import type { RequestEvent } from "../blogs/$types";
import createError from '../../../utils/createError';
import { StatusCodes } from 'http-status-codes';
import jwt from "jsonwebtoken"

export const POST: RequestHandler = async (reqEvt: RequestEvent) => {
	const { request } = reqEvt
	let body = await request.json()
	
	createError(!body.password, StatusCodes.BAD_REQUEST, "Request must include the password")
	createError(body.password !== process.env.PASSWORD, StatusCodes.UNAUTHORIZED, "Invalid password")
	
	let token = jwt.sign("priviledged_user", process.env.JWT_SECRET || "jwtsecret")
	return json({ token })
}