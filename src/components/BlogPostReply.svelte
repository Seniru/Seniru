<script lang="ts">
    export let nickname: string
    export let content: string
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
