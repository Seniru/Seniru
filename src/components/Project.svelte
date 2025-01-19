<script lang="ts">
    import Tag from "./Tag.svelte"
    import defautImage from "../assets/image-placeholder.webp"

    export let name: string
    export let image: string = defautImage
    export let link: string
    export let tags: Array<string>
</script>

<div class="project">
    <div class="image-container">
        <img src={image} alt="project" />
    </div>
    <div class="project-info">
        <div>
            <h3>{name}</h3>
            <p class="project-description">
                <slot />
            </p>
            <a href={link}>View project</a>
        </div>
        <div class="tags">
            {#each tags as tag}
                <Tag name={tag} />
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
    @use "../utils/variables.scss" as v;
    .project {
        background-color: v.$background-color;
        padding: 15px;
        width: calc(100% - 30px);
        height: fit-content;
        margin-bottom: 10px;
        display: grid;

        @media (min-width: 800px) {
            display: flex;
        }

        .image-container {
            width: 100%;
            margin-bottom: 0;

            @media (min-width: 800px) {
                width: 30%;
            }

            img {
                width: 100%;
                height: 80%;
                border-radius: 15px;
            }

            margin-right: 10px;
        }

        .project-info {
            width: 100%;

            @media (min-width: 800px) {
                width: 70%;
            }

            display: grid;
            padding-right: 10px;
            align-content: space-between;
            .tags {
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-end;
                margin-top: 10px;
            }
        }
    }
</style>
