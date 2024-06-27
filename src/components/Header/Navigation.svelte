<script>
	import NavigationItem from './NavigationItem.svelte'
</script>

<nav>
	<ul>
		<slot />
	</ul>
</nav>

<style lang="scss">
	nav {
		display: inline;
		vertical-align: middle;
		position: absolute;
		right: 1px;
		height: 50px;

		ul {
			padding-left: 0px;
			list-style-type: none;
		}
	}
</style>
