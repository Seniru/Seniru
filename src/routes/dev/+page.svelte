<script>
	import Project from '../../components/Project.svelte'
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
	<Project name="at.py" tags={['python']} link="https://github.com/Seniru/at.py">
		An asynchronous and event-based AT terminal implementation using asyncio and serial.
	</Project>
	<Project
		name="Calculator"
		image="https://github.com/Seniru/Calculator/assets/34127015/6a7df1db-31f9-470f-976c-5e180d2dab4c"
		tags={['web', 'javascript']}
		link="https://github.com/Seniru/at.py"
	>
		A fancy calculator with lot's of awesome features.<br />
		Calculator is an app made for simplifying your calculations more! Supports lots of mathematical functions.
		It also allows you to edit expressions without letting you to make any error.
	</Project>
	<Project
		name="pewpew"
		image="https://static.wikia.nocookie.net/transformice/images/6/6a/Pewpew_map.png"
		tags={['lua', 'transformice']}
		link="https://github.com/Seniru/pewpew"
	>
		#Pewpew is an official Transformice module originally created by Baasbase#0095 and maintained by
		King_seniru#5890 (since 09/09/2020) where you shoot random objects at each other to win
	</Project>
	<Project
		name="wtal-bot"
		image="http://logostribu.atelier801.com/7510/1187510.jpg?1719460820705"
		tags={['python', 'transformice', 'lua', 'docker']}
		link="https://github.com/Seniru/wtal-bot"
	>
		Discord and Transformice bot for the tribe We talk a Lot
	</Project>
	<Project
		name="flowcharts"
		image="https://github.com/Seniru/flowcharts/assets/34127015/5984fcd7-1fb3-432d-9edc-24a319466e08"
		tags={['web']}
		link="https://github.com/Seniru/flowcharts"
	>
		Create, run and debug flowcharts!
	</Project>
	<Project
		name="Nobles' Quest 2022"
		image="https://github.com/Seniru/evt_nobles_quest/assets/34127015/6b7248bb-e35b-4466-98e4-7747faf0298a"
		tags={['lua', 'transformice']}
		link="https://github.com/Seniru/evt_nobles_quest"
	>
		Nobles' Quest 2022 Transformice event.<br /><br />
		The princess and the treasury are in danger under the hands of evil forces. Travel back to the ancient
		medieval times to gather resources, craft items and get stronger, then fight off the monsters!<br
		/>
		Are you worthy of this mission? Then come help the kingdom regain it's glory!<br /><br />
		Check out the game
		<a href="https://store.steampowered.com/app/335240/Transformice/" target="_blank"
			>Transformice</a
		>
		to enjoy this awesome event creted by me and the Event Squad!
		<br />
	</Project>
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
