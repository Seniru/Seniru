<script lang="ts">
	import Tag from './Tag.svelte'
	import defautImage from '../assets/image-placeholder.webp'

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
		<h3>{name}</h3>
		<p class="project-description">
			<slot />
		</p>
		<a href={link}>View project</a>
		<div class="tags">
			{#each tags as tag}
				<Tag name={tag} />
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.project {
		position: relative;
		background-color: #030637;
		padding: 15px;
		width: calc(100% - 30px);
		height: fit-content;
		margin-bottom: 10px;

		.image-container {
			width: 30%;
			height: 100%;
			position: relative;
			display: inline-block;
			vertical-align: top;
			border-radius: 5px;

			img {
				width: 100%;
				height: 250px;
			}
		}

		.project-info {
			width: 60%;
			height: 100%;
			margin-left: 15px;
			display: inline-block;
			vertical-align: top;

			.tags {
				position: absolute;
				right: 20px;
				bottom: 20px;
			}
		}
	}
</style>
