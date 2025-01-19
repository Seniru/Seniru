import { error, json, type RequestHandler, type RequestEvent } from "@sveltejs/kit"
import { StatusCodes, ReasonPhrases } from "http-status-codes"

import createError from "../../../utils/createError"
import BlogPostHandler from "../../../../db/BlogPostHandler"

export const POST: RequestHandler = async (reqEvt: RequestEvent) => {
    const { locals, request } = reqEvt
    let body = await request.json()
    const { dbConn, priviledged } = locals

    createError(!priviledged, StatusCodes.UNAUTHORIZED, "You need to log in")

    createError(
        !body.title || !body.content,
        StatusCodes.BAD_REQUEST,
        "Missing title or content in request"
    )

    createError(body.title > 250, StatusCodes.BAD_REQUEST, "Title should be 250 characters or less")
    createError(
        body.content > 5000,
        StatusCodes.BAD_REQUEST,
        "Content should be 5000 characters or less"
    )

    const handler: BlogPostHandler = new BlogPostHandler(dbConn)
    let id = await handler.createBlogPost(body.title, body.content)

    if (id) return json({ message: { id } })
    error(StatusCodes.INTERNAL_SERVER_ERROR, { message: ReasonPhrases.INTERNAL_SERVER_ERROR })
}

export const GET: RequestHandler = async (reqEvt: RequestEvent) => {
    const { locals, request } = reqEvt
    const { dbConn, priviledged } = locals

    const handler: BlogPostHandler = new BlogPostHandler(dbConn)
    let blogPosts = await handler.getBlogPosts()
    return json(blogPosts.toReversed())
}
