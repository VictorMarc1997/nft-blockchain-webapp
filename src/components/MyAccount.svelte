<script>
  import {onMount} from "svelte";
  import { baseUrl, userState } from '../stores.js'

  let amount = null;
  let nfts = [];
  let receiverAddress = null;
  let sendAmount = null;
  let sendAsset = null;
  let sendSuccess = null;

  let receiverAddressAdmin = null;
  let sendAmountAdmin = null;
  let sendSuccessAdmin = null;

  onMount(updateWallet);

  async function updateWallet () {
    let options = {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + $userState.apiKey,
      },
    };

    let response = await fetch($baseUrl + '/get_wallet', options)
    let data = await response.json();
    if (data.success) {
      amount = data.amount;
      nfts = data.assets;
    }
  }

  async function sendTransaction () {
    let options = {
      method: 'POST',
      body: JSON.stringify({
        receiver: receiverAddress,
        amount: sendAmount,
        asset: sendAsset,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + $userState.apiKey,
      },
    }

    let response = await fetch($baseUrl + '/make_transaction', options)
    let data = await response.json();
    sendSuccess = !!data.success;
  }

  async function sendTransactionAdmin () {
    let options = {
      method: 'POST',
      body: JSON.stringify({
        sender: '0',
        receiver: receiverAddressAdmin,
        amount: sendAmountAdmin,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + $userState.apiKey,
      },
    }

    let response = await fetch($baseUrl + '/make_transaction', options)
    let data = await response.json();
    sendSuccessAdmin = !!data.success;
  }

  function mineBlock () {
    fetch($baseUrl + '/mine_block')
  }

</script>

<div class="main-content">
  <p>My address: {$userState.address}</p>
  <p>Amount: <b style="font-size:18px">{amount}</b></p>
  <p>NFTs:</p>
  <ul>
  {#each nfts as nft}
    <li>{nft}</li>
  {/each}
  </ul>

  <div class="send-box">
    <input
        type="text"
        placeholder="Address to send to.."
        class="input" bind:value={receiverAddress}
        style="width:300px"
    >
    <input
        type="number"
        placeholder="Amount..."
        class="input" bind:value={sendAmount}
        style="width:100px"
    >
    <input
        type="text"
        placeholder="NFT..."
        class="input" bind:value={sendAsset}
        style="width:300px"
    >
    <button on:click={sendTransaction}>Send</button>

    {#if sendSuccess !== null}
      {#if sendSuccess}
        <p style="color: #00ff15">Successful transaction</p>
      {:else}
        <p style="color: #ff0000">Invalid transaction</p>
      {/if}
    {/if}
  </div>

  {#if $userState.admin}
    <h2> Admin Tools: </h2>
    <div class="admin-tools">
      <div class="send-box">
        <input
            type="text"
            placeholder="Address to send to.."
            class="input" bind:value={receiverAddressAdmin}
            style="width:300px"
        >
        <input
            type="number"
            placeholder="Amount..."
            class="input" bind:value={sendAmountAdmin}
            style="width:100px"
        >
        <button on:click={sendTransactionAdmin}>Give</button>
        {#if sendSuccessAdmin !== null}
          {#if sendSuccessAdmin}
            <p style="color: #00ff15">Successful transaction</p>
          {:else}
            <p style="color: #ff0000">Invalid transaction</p>
          {/if}
        {/if}
      </div>
    </div>
  {/if}

  <div class="actions">
    <button on:click={updateWallet}>Refresh</button>
    <button on:click={mineBlock}>Mine Block</button>
  </div>
</div>

<style>
  .main-content {
    width: 100%;
    display: grid;
    place-items: center;
    background-color: rgba(0, 0, 0, 0.9);
    border-radius: 20px;
    padding-top: 50px;
  }
  p, h2 {
    color: white;
  }

  ul{
    color: white;
    list-style-type: none; /* Remove bullets */
    padding: 0; /* Remove padding */
    margin: 0; /* Remove margins */
  }

  .send-box {
    margin-top: 20px;
    margin-bottom: 30px;
  }

  .send-box button{
    padding: 10px;
  }

  .actions {
    display: inline-block;
  }
</style>