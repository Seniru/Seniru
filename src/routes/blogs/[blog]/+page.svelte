<script lang="ts">
    import { afterUpdate, onMount } from "svelte"
    import { marked } from "marked"
    import { page } from "$app/stores"
    import hljs from "highlight.js"
    import "highlight.js/styles/atom-one-dark.css"

    import BlogPost from "../../../components/BlogPost.svelte"
    import { parse } from "dotenv"

    export let data: { blog: BlogPost }

    let blog = null
    let pageViews = 0
    let editting = false
    let title = ""
    let content = ""

    if (data) {
        blog = data.blog.result
        title = blog.title
        content = blog.content
    }

    onMount(async () => {
        let response = await fetch(`https://api.counterapi.dev/v1/seniru/blog-${blog.id}/up`)
        if (response.ok) {
            let result = await response.json()
            pageViews = result.count
        }
    })

    afterUpdate(() => {
        document.querySelectorAll("pre code").forEach((block) => {
            hljs.highlightElement(block as HTMLElement)
        })
    })

    const deleteBlog = async () => {
        let response = await fetch(`/api/blogs/${blog.id}`, {
            method: "DELETE"
        })
        if (response.ok) window.location.href = "/blogs"
    }

    const editBlog = async (event: SubmitEvent) => {
        event.preventDefault()
        let response = await fetch(`/api/blogs/${blog.id}`, {
            method: "PATCH",
            body: JSON.stringify({ title, content })
        })
        let result = await response.json()
        if (response.ok) {
            window.location.reload()
        } else {
            alert(result.message || response.statusText)
        }
    }

    const ldJson = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blog.title,
        author: {
            "@type": "Person",
            name: "Seniru Pasan"
        },
        datePublished: blog.publishedDate,
        dateModified: blog.lastEdittedDate,
        image: "https://seniru.vercel.app/favicon.svg",
        url: "https://seniru.vercel.app/blogs/" + blog.id,
        description: blog.content.slice(0, 160).replace(/[\r\n]+/g, " ")
    })
</script>

<svelte:head>
    {@html `<script type="application/ld+json">${ldJson}</script>`}

    {#if blog}
        <title>{blog.title} - Seniru Pasan</title>
        <meta name="description" content={blog.content.slice(0, 160).replace(/[\r\n]+/g, " ")} />
        <meta name="author" content="Seniru Pasan" />
        <meta property="og:title" content="{blog.title} - Seniru Pasan" />
        <meta
            property="og:description"
            content={blog.content.slice(0, 160).replace(/[\r\n]+/g, " ")}
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={"https://seniru.vercel.app/blogs/" + blog.id} />
        <meta property="og:image" content="https://seniru.vercel.app/favicon.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="{blog.title} - Seniru Pasan" />
        <meta
            name="twitter:description"
            content={blog.content.slice(0, 160).replace(/[\r\n]+/g, " ")}
        />
        <meta name="twitter:image" content="https://seniru.vercel.app/favicon.svg" />
    {/if}
</svelte:head>

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

{#if editting}
    <h1>Edit blog post</h1>

    <form on:submit={editBlog}>
        <label for="title">Title</label>
        <br />
        <input type="text" name="title" bind:value={title} />
        <br />
        <br />
        <label for="body">Body</label>
        <br />
        <textarea name="body" cols={100} rows={10} bind:value={content} contenteditable />
        <br />
        <input type="submit" value="Submit" />
        <button type="button" on:click={() => (editting = false)}> Cancel </button>
    </form>

    <br />
    <h3>Preview</h3>
    <hr />
    <br />

    {#if content.length > 0}
        <div class="container">
            {@html marked.parse(content)}
        </div>
    {:else}
        <p class="important">Nothing to display yet...</p>
    {/if}
{/if}

{#if $page.data.priviledged && !editting}
    <div class="priviledged-actions">
        <button on:click={() => (editting = true)}>Edit</button>
        <button style="background-color: red;" on:click={deleteBlog}>Delete</button>
    </div>
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

    .priviledged-actions {
        display: flex;
        justify-content: space-between;
    }
</style>
