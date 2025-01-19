import { error, type RequestHandler, type RequestEvent, json } from "@sveltejs/kit"
import { ReasonPhrases, StatusCodes } from "http-status-codes"

import createError from "../../../../utils/createError"
import BlogPostHandler from "../../../../../db/BlogPostHandler"

export const GET: RequestHandler = async (req: RequestEvent) => {
    const { locals, params } = req
    const { dbConn } = locals

    let blogId: number = Number(params.blog)
    createError(isNaN(blogId), StatusCodes.BAD_REQUEST, "Invalid type for Blog id")

    const handler: BlogPostHandler = new BlogPostHandler(dbConn)
    let blogPost = await handler.getBlogPost(blogId)
    createError(!blogPost, StatusCodes.NOT_FOUND)

    return json({
        message: ReasonPhrases.OK,
        result: blogPost
    })
}

export const PATCH: RequestHandler = async (req: RequestEvent) => {
    const { locals, params, request } = req
    const { dbConn } = locals
    let body = await request.json()

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

    let blogId: number = Number(params.blog)
    createError(isNaN(blogId), StatusCodes.BAD_REQUEST, "Invalid type for Blog id")

    const handler: BlogPostHandler = new BlogPostHandler(dbConn)
    let blogPost = await handler.editBlogPost(blogId, body.title, body.content)
    createError(!blogPost, StatusCodes.NOT_FOUND)

    return json({
        message: ReasonPhrases.OK
    })
}

export const DELETE: RequestHandler = async (req: RequestEvent) => {
    const { locals, params } = req
    const { dbConn } = locals

    let blogId: number = Number(params.blog)
    createError(isNaN(blogId), StatusCodes.BAD_REQUEST, "Invalid type for Blog id")

    const handler: BlogPostHandler = new BlogPostHandler(dbConn)
    let blogPost = await handler.deleteBlogPost(blogId)
    createError(!blogPost, StatusCodes.NOT_FOUND)

    return json({
        message: ReasonPhrases.OK
    })
}
