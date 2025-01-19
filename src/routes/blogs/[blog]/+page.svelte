<script lang="ts">
    import { onMount } from "svelte"
    import { marked } from "marked"
    import { page } from "$app/stores"

    import BlogPost from "../../../components/BlogPost.svelte"

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
        <button type="button" on:click={() => editting = false}>
            Cancel
        </button>
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
        <button on:click={() => editting = true}>Edit</button>
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
