// +page.ts
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ params, fetch }) => {
    const res = await fetch(`/api/blogs/${params.blog}`)
    const blog = await res.json()

    return {
        blog
    }
}
