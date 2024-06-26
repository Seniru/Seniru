<script>
	import logo from "../../assets/logo.svg"
	import Navigation from "./Navigation.svelte"
	import NavigationItem from "./NavigationItem.svelte";
</script>

<header>

	<img
		src={logo}
		class="logo"
		alt="Logo"
		width="100px"
		height="50px"
	/>

	<Navigation>
		<NavigationItem href="./" text="About" />
		<NavigationItem href="./dev" text="Dev" />
		<NavigationItem href="./" text="Blog" />
	</Navigation>

</header>

<style lang="scss">
	@import "../../app.scss";

	header {
		position: sticky;
	}

	.logo {
		display: inline-block;
		vertical-align: middle;
	}
</style>