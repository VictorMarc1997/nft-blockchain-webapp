<script>
	import { onMount } from "svelte";
	const url = "http://127.0.0.1:5000";
	let total_addr = 0;
	let total_nfts = 0;
	let total_transactions = 0;

	onMount(async function () {
		let response = await fetch(url + '/list_addresses');
		let data = await response.json();
		total_addr = data['total'];

		response = await fetch(url + '/total_transactions');
		data = await response.json();
		total_transactions = data['result'];

        response = await fetch(url + '/list_nfts');
		data = await response.json();
		total_nfts = data['total'];
	});
</script>

<div class="main-content">
    <div class="centered-box">
        <h1>There are currently</h1>
        <h1>{total_addr} addresses</h1>
        <h1>{total_nfts} registered NFTs</h1>
        <h1>{total_transactions} total transactions</h1>
    </div>
</div>

<style>
	.main-content {
		width: 100%;
		margin-top: 100px;
		display: grid;
		place-items: center;
	}

	.centered-box {
		background-color: rgba(0, 0, 0, 0.9);
        border-radius: 15px;
		padding: 30px;
	}

	h1 {
		color: #ffffff;
		font-size: 3em;
		font-weight: 100;
	}
</style>