<script>
	export let href
	export let text
</script>

<li>
	<a {href}>
		{text}
	</a>
</li>

<style lang="scss">
	@import "../../app.scss";

	li {
		
		display: inline;
		margin-right: 10px;
		
		a:link, a:visited, a:active, a:hover {
			color: white;
			text-decoration: none;
			font-weight: bold;
		}

		a:hover {
			text-decoration: underline;
		}

		a:active {
			text-decoration: underline;
			color: $tertiary-color;
		}
	}
</style>