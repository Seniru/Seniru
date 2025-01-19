<script lang="ts">
    import { onMount } from "svelte"
    import { marked } from "marked"
    import { page } from "$app/stores"

    import BlogPost from "../../../components/BlogPost.svelte"

    export let data: { blog: BlogPost }
    let blog = null
    if (data) {
        blog = data.blog.result
    }

    let pageViews = 0

    onMount(async () => {
        let response = await fetch(`https://api.counterapi.dev/v1/seniru/blog-${blog.id}/up`)
        if (response.ok) {
            let result = await response.json()
            pageViews = result.count
        }
    })

    const deleteBlog = async () => {
        let response = await fetch(`/api/blogs/${blog.id}`, {
            method: "DELETE"
        })
        if (response.ok) window.location.href = "/blogs"
    }

</script>

{#if !blog}
    <h2>404</h2>
    Not found
{:else}
    <h1>{blog.title}</h1>
    <div class="container">
        <div class="blog-info">
            <div>
                <i class="fa-solid fa-eye"></i>
                {" "}
                Page views:
                {" "}
                {pageViews}
            </div>
            <div>
                <i class="fa-regular fa-calendar"></i>
                {" "}
                Published on:
                {" "}
                {new Date(blog.publishedDate).toLocaleString()}
            </div>
            {#if blog.lastEdittedDate}
                <div title="Last editted date">
                    <i class="fa-solid fa-pencil"></i>
                    {" "}
                    Last editted on:
                    {" "}
                    {new Date(blog.lastEdittedDate).toLocaleString()}
                </div>
            {/if}
        </div>

        {@html marked.parse(blog.content)}
    </div>
{/if}

<br />
<br />

{#if $page.data.priviledged}
    <button on:click={deleteBlog}>Delete</button>
{/if}

<style lang="scss">
    @use "../../../utils/variables.scss" as v;

    .blog-info {
        text-align: right;
        font-size: 12px;
        color: v.$text-color-secondary;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>
