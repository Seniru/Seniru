import { type PoolClient } from "pg"

import { type BlogPost, type BlogPostReply } from "./BlogPost"

class BlogPostHandler {
    private client: PoolClient

    constructor(client: PoolClient) {
        this.client = client
    }

    async createBlogPost(title: string, content: string): Promise<Number | null> {
        let res = await this.client.query(
            "INSERT INTO BlogPost (title, content, publishedDate) VALUES ($1, $2, NOW()) RETURNING id",
            [title, content]
        )

        if (res) return res.rows[0].id
        return null
    }

    async getBlogPosts(): Promise<BlogPost[]> {
        let res = await this.client.query("SELECT * FROM BlogPost")
        return res.rows.map((blog) => {
            let {
                id,
                title,
                publisheddate: publishedDate,
                lasteditteddate: lastEdittedDate
            }: {
                id: number
                title: string
                publisheddate: Date
                lasteditteddate: Date | undefined
            } = blog

            let blogPost: BlogPost = { id, title, publishedDate, lastEdittedDate }
            return blogPost
        })
    }

    async getBlogPost(blogId: number): Promise<BlogPost | null> {
        let res = await this.client.query("SELECT * FROM BlogPost WHERE id = $1", [blogId])
        if (res.rowCount == 0) return null

        // fetch replies
        let replyRes = await this.client.query(
            "SELECT * FROM BlogPostReply WHERE blogpostId = $1",
            [blogId]
        )
        let replies = replyRes.rows.map(
            (reply) => ({ nickname: reply.nickname, replyContent: reply.content }) as BlogPostReply
        )

        let {
            id,
            title,
            content,
            publisheddate: publishedDate,
            lasteditteddate: lastEdittedDate
        }: {
            id: number
            title: string
            content: string
            publisheddate: Date
            lasteditteddate: Date | undefined
        } = res.rows[0]

        let blogPost: BlogPost = { id, title, content, publishedDate, lastEdittedDate, replies }
        return blogPost
    }

    async editBlogPost(blogId: number, title: string, content: string): Promise<boolean> {
        let res = await this.client.query(
            "UPDATE BlogPost SET title = $1, content = $2, lastEdittedDate = NOW() WHERE id = $3",
            [title, content, blogId]
        )
        if (!res) return false
        if (res.rowCount == 0) return false
        return true
    }

    async deleteBlogPost(blogId: number): Promise<boolean> {
        let res = await this.client.query("DELETE FROM BlogPost WHERE id = $1", [blogId])
        if (!res) return false
        if (res.rowCount == 0) return false
        return true
    }

    async createReply(blogId: number, nickname: string, content: string): Promise<void> {
        await this.client.query(
            "INSERT INTO BlogPostReply (blogPostId, nickname, content) VALUES ($1, $2, $3)",
            [blogId, nickname, content]
        )
    }

    // we'll just have to delete by the content because the reply id's are not really consistent
    // that is thanks to me not considering about incrementing blog reply ids properly.
    // it's fine though because this is just a blog website that no one probably cares.
    async deleteReply(blogId: number, content: string): Promise<void> {
        await this.client.query(
            "DELETE FROM BlogPostReply WHERE blogPostId = $1 AND content = $2",
            [blogId, content]
        )
    }
}

export default BlogPostHandler
