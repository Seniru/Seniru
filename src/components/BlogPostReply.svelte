<script lang="ts">
    import { page } from "$app/stores"

    export let blogId: number
    export let nickname: string
    export let content: string

    const deleteReply = async () => {
        let response = await fetch(`/api/blogs/${blogId}/reply`, {
            method: "DELETE",
            body: JSON.stringify({ content })
        })
        let result = await response.json()
        if (response.ok) {
            window.location.reload()
        } else {
            alert(result.message || response.statusText)
        }
    }
</script>

<div class="container reply-container">
    <div class="nick">
        {#if nickname === "senirupasan"}
            <b>senirupasan</b>
            <abbr title="This is a verified reply made by the author">(author)</abbr>
            replied,
        {:else}
            <b>{nickname}</b> replied,
        {/if}
    </div>
    <p>{content}</p>
    {#if $page.data.priviledged}
        <button style="background-color: red;" on:click={deleteReply}>Delete</button>
    {/if}
</div>

<style lang="scss">
    @use "../utils/variables.scss" as v;

    .reply-container {
        margin-bottom: 10px;
        margin-top: 10px;

        .nick {
            font-style: italic;
            color: v.$text-color-secondary;
        }
    }
</style>
