<script lang="ts">
    export let id: Number
    export let title: string
    export let publishedDate: Date
    export let lastEdittedDate: Date | null
    export let replyCount: number
</script>

<div class="container blog-post">
    <div class="blog-post-left">
        <div class="important">#{id}</div>
        <div class="blog-details">
            <h3>
                <a href={`/blogs/${id}`}>{title}</a>
            </h3>
            <div class="reply-count">{replyCount} {replyCount == 1 ? "reply" : "replies"}</div>
        </div>
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
        display: flex;
        align-items: center;
        justify-content: space-between;

        .blog-post-left {
            display: flex;
            gap: 25px;
            align-items: center;
        }

        .blog-details {
            h3 {
                margin: 3px 0px;
                a {
                    color: v.$text-color-primary;
                }
            }
            display: grid;
        }

        .reply-count {
            font-size: 12px;
            color: v.$text-color-secondary;
        }

        .date-information {
            font-size: 10px;
            color: v.$text-color-secondary;
            width: max-content;
        }
    }
</style>
