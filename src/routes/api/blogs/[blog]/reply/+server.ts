import { error, json, type RequestEvent, type RequestHandler } from "@sveltejs/kit"
import { ReasonPhrases, StatusCodes } from "http-status-codes"
import createError from "../../../../../utils/createError"
import BlogPostHandler from "../../../../../../db/BlogPostHandler"

export const POST: RequestHandler = async (reqEvt: RequestEvent) => {
    const { locals, request } = reqEvt
    let body = await request.json()
    const { dbConn, priviledged } = locals

    createError(
        !body.nickname || !body.content || !body.blogId,
        StatusCodes.BAD_REQUEST,
        "Missing blogId, nickname or content in request"
    )

    createError(
        body.nickname.toLowerCase() === "senirupasan",
        StatusCodes.BAD_REQUEST,
        "nickname cannot be senirupasan"
    )
    createError(
        body.nickname > 20,
        StatusCodes.BAD_REQUEST,
        "nickname must be 20 characters or less"
    )
    createError(body.nickname < 4, StatusCodes.BAD_REQUEST, "nickname must be atleast 4 characters")
    createError(
        body.content > 250,
        StatusCodes.BAD_REQUEST,
        "content must be 250 characters or less"
    )
    createError(body.content < 4, StatusCodes.BAD_REQUEST, "content must be atleast 4 characters")

    const handler: BlogPostHandler = new BlogPostHandler(dbConn)
    try {
        await handler.createReply(
            body.blogId,
            priviledged ? "senirupasan" : body.nickname,
            body.content
        )
        return json({
            message: ReasonPhrases.OK
        })
    } catch (err) {
        console.error(err)
        error(StatusCodes.INTERNAL_SERVER_ERROR, { message: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
}
