<script lang="ts">
    export let id: Number
    export let title: string
    export let publishedDate: Date
    export let lastEdittedDate: Date | null
</script>

<div class="container blog-post">
    <div class="important">#{id}</div>
    <div>
        <h3>
            <a href={`/blogs/${id}`}>{title}</a>
        </h3>
    </div>
    <div class="date-information">
        <div title="Published date">
            <i class="fa-regular fa-calendar"></i>
            {" "}
            {new Date(publishedDate).toLocaleString()}
        </div>
        <div title="Last editted date">
            {#if lastEdittedDate}
                <i class="fa-solid fa-pencil"></i>
                {new Date(lastEdittedDate).toLocaleString()}
            {/if}
        </div>
    </div>
</div>

<style lang="scss">
    @use "../utils/variables.scss" as v;

    .blog-post {
        margin: 10px;
        display: grid;
        grid-template-columns: 10px auto 100px;
        gap: 15px;
        align-items: center;

        .date-information {
            font-size: 10px;
            color: v.$text-color-secondary;
        }
    }
</style>
