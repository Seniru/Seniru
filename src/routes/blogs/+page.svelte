<script lang="ts">
    import BlogPost from "../../components/BlogPost.svelte"

    let blogPosts: BlogPost[] = []
    export let data: {
        blogPosts: BlogPost[]
    }

    if (data) blogPosts = data.blogPosts
    export const ssr = true
</script>

<h1>Blogs</h1>

{#each blogPosts as blogPost}
    <BlogPost
        id={blogPost.id}
        title={blogPost.title}
        publishedDate={blogPost.publishedDate}
        lastEdittedDate={blogPost.lastEdittedDate}
        replyCount={blogPost.replyCount}
    />
{/each}
