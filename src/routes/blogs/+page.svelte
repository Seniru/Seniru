<script lang="ts">
    import { onMount } from "svelte"
    import BlogPost from "../../components/BlogPost.svelte"

    let blogPosts: BlogPost[] = []

    onMount(async () => {
        let response = await fetch("/api/blogs")
        if (response.ok) {
            blogPosts = await response.json()
        }
    })
</script>

<h1>Blogs</h1>

{#each blogPosts as blogPost}
    <BlogPost
        id={blogPost.id}
        title={blogPost.title}
        publishedDate={blogPost.publishedDate}
        lastEdittedDate={blogPost.lastEdittedDate}
    />
{/each}
