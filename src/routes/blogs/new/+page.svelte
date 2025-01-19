<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'
	import { marked } from 'marked';

	let title = ""
	let content = ""

	onMount(() => {
		if (!$page.data.token) goto("/")
	})

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault()
		let response = await fetch("/api/blogs", {
			method: "POST",
			body: JSON.stringify({ title, content })
		})
		let result = await response.json()

		if (response.ok) {
			window.location.reload()
		} else {
			alert(result || response.statusText)
		}
	}


</script>

<h1>Create a new blog post</h1>


<form on:submit={handleSubmit}>
	<label for="title">Title</label>
	<br />
	<input type="text" name="title" bind:value={title} />
	<br />
	<br />
	<label for="body">Body</label>
	<br />
	<textarea name="body" cols={100} rows={10} bind:value={content} contenteditable />
	<br />
	<input type="submit" value="Submit" />
</form>

<br />
<h3>Preview</h3>
<hr />
<br />

{#if content.length > 0}
	<div class="container" >
		{@html marked.parse(content) }
	</div>
{:else}
	<p class="important">Nothing to display yet...</p>
{/if}

<br />
<br />

