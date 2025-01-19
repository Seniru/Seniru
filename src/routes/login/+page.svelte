<script lang="ts">
	import { page } from '$app/stores'

	let password = ""

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault()
		let response = await fetch("/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ password })
		})
		let result = await response.json()
		if (response.ok) {
			document.cookie = `token=${result.token}`
			window.location.reload()
		}
	}

	const logout = (event: MouseEvent) => {
        document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
		window.location.reload()
	}

</script>

<form on:submit={handleSubmit}>
	{#if $page.data.token}
	<p>You are already logged in!</p>
	<button on:click={logout}>Logout</button>
	{:else}
	<input type="password" bind:value={password} />
	<input type="submit" />
	{/if}
</form>