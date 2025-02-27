import { type PoolClient } from "pg"

import { type BlogPost } from "./BlogPost"

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
                content,
                publisheddate: publishedDate,
                lasteditteddate: lastEdittedDate
            }: {
                id: number
                title: string
                content: string
                publisheddate: Date
                lasteditteddate: Date | undefined
            } = blog

            let blogPost: BlogPost = { id, title, content, publishedDate, lastEdittedDate }
            return blogPost
        })
    }

    async getBlogPost(blogId: number): Promise<BlogPost | null> {
        let res = await this.client.query("SELECT * FROM BlogPost WHERE id = $1", [blogId])
        if (res.rowCount == 0) return null
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

        let blogPost: BlogPost = { id, title, content, publishedDate, lastEdittedDate }
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
}

export default BlogPostHandler
