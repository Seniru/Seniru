import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch("/api/blogs")
    const blogPosts = await res.json()

    return {
        blogPosts
    }
}
