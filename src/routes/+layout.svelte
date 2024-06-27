<script>
	import '@fortawesome/fontawesome-free/css/all.min.css'

	import '../app.scss'
	import '../components/components.scss'

	import Header from '../components/Header'
	import Footer from '../components/Footer.svelte'
</script>

<svelte:head>
	<title>Seniru</title>
	<!-- google fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Header />
<slot></slot>
<Footer />
