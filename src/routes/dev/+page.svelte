<script>
	import Project from '../../components/Project.svelte'
	import ComboBox from '../../components/ComboBox'

	import projects from './projects.json'

	let allTags = ['python', 'web', 'javascript', 'lua', 'transformice', 'docker']
	let selectedProjectTags = allTags
</script>

<section class="container">
	<p>
		I am a developer with <span class="important">7 years of experience</span><br />
		I am interested in,
	</p>
	<ul id="interests">
		<li>Computer science</li>
		<li>Library development and maintainence</li>
		<li>Backend development</li>
		<li>Game develpment</li>
	</ul>
	<br />
	<hr />
	<br />
	These are the languages that I have worked with the most
	<br /><br />
	<div id="languages">
		<div>
			<ul>
				<li>Lua</li>
				<li>Python</li>
				<li>Javascript / Node</li>
				<li>Java</li>
			</ul>
			<div id="language-icons">
				<img src="https://cdn.discordapp.com/emojis/403294912772177923.png?v=1" alt="lua" />
				<img src="https://cdn.discordapp.com/emojis/403294924432211968.png?v=1" alt="python" />
				<img src="https://cdn.discordapp.com/emojis/403294965192458240.png?v=1" alt="node" />
				<img src="https://cdn.discordapp.com/emojis/403294977154875412.png?v=1" alt="java" />
			</div>
		</div>
		<img
			src="https://github-readme-stats.vercel.app/api/top-langs/?username=Seniru&hide=Jupyter%20Notebook&size_weight=1&count_weight=0&langs_count=20&layout=compact&theme=midnight-purple"
			alt="Languages"
		/>
	</div>
	<br />
	<hr />
</section>
<h1>Projects</h1>
<section class="container">
	<p>
		Check all my codes and repositories at <a href="https://github.com/Seniru" target="_blank"
			>Github</a
		>
	</p>

	<ComboBox
		kind="tags"
		values={Object.fromEntries(allTags.map((tag) => [tag, true]))}
		on:select={(evt) => {
			console.log(evt.detail)
			selectedProjectTags = Object.keys(evt.detail).filter((tag) => evt.detail[tag])
		}}
	/>
	<br /><br />

	{#each projects.filter( (project) => project.tags.some( (tag) => selectedProjectTags.includes(tag) ) ) as project}
		<Project name={project.name} image={project.image} tags={project.tags} link={project.link}>
			{project.description}
		</Project>
	{:else}
		No projects to display...
	{/each}
</section>

<style lang="scss">
	@use '../../utils/variables.scss' as v;

	#interests {
		color: v.$text-color-secondary;
	}

	#languages {
		height: 100%;
		position: relative;
		div,
		img {
			width: 45%;
			display: inline-block;
			vertical-align: top;
		}
		div > #language-icons {
			position: absolute;
			bottom: 1px;
			img {
				width: 50px;
				height: 50px;
				margin-left: 10px;
			}
		}
	}
</style>
