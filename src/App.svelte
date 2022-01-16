<script>
	import router from "page"
	import Blockchain from "./components/Blockchain.svelte";
	import NavBar from './components/NavBar.svelte'
	import Home from './components/Home.svelte'
	import Transactions from "./components/Transactions.svelte";
	import LogIn from "./components/LogIn.svelte";
	import NFTs from "./components/NFTs.svelte";

	let page

	router('/', () => page = Home)
	router('/nfts', () => page = NFTs)
	router('/transactions', () => page = Transactions)
	router('/blockchain', () => page = Blockchain)
	router('/login', () => page = LogIn)

	router.start()
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Comfortaa&display=swap" rel="stylesheet">
</svelte:head>

<main>
	<div class="content">
		<div class="nav-bar">
			<NavBar />
		</div>
		<svelte:component this={page} />
	</div>
</main>

<style>
	main {
		font-family: 'Comfortaa', cursive;
		text-align: center;
		padding: 1em;
		/*max-width: 240px;*/
		height: 100%;
		background-image: url("/images/background.png");
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}

	.content {
		width: 90%;
		margin: auto;
	}

	.nav-bar {
		height: 200px;
	}

</style>