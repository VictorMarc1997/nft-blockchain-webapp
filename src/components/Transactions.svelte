<script>
  import VirtualList from 'svelte-tiny-virtual-list';
  import { baseUrl } from '../stores.js'

  let searchText = null;
  let transactions = null;
  let searchSuccess = null;

  // onMount(search);

  async function search () {
    let options = {
      method: 'POST',
      body: JSON.stringify({address: searchText}),
      headers: {
          'Content-Type': 'application/json'
      },
    };

    let response = await fetch($baseUrl + '/list_transactions', options)
    let data = await response.json();
    if (data.success) {
      transactions = data.result.reverse();
      searchSuccess = true;
    } else {
      searchSuccess = false;
    }
  }
</script>

<div class="main-content">
  <p style="color: white">Search address:</p>
  <div style="display: inline-block; padding-bottom: 50px">
    <input
        type="text"
        placeholder="0x0000..."
        class="input" bind:value={searchText}
        style="width:300px"
    >
    <button on:click={search}>Search</button>
    {#if searchSuccess !== null}
      {#if !searchSuccess}
          <p style="color: #ff0000">Address does not exist</p>
      {/if}
    {/if}
  </div>

  {#if transactions}
    <VirtualList
        width="80%"
        height={800}
        itemCount={Math.max(transactions.length - 1, 0)}
        itemSize={100}
    >
      <div slot="header" class="headers">
        <div id="h1">Timestamp</div>|
        <div id="h2">Sender</div>|
        <div id="h3">Receiver</div>|
        <div id="h4">Amount</div>|
        <div id="h5">Asset</div>
      </div>
      <div slot="item" let:index let:style {style} class="items">
        <div class="col1 item-col">{new Date(transactions[index].timestamp).toLocaleString()}</div>|
        <div class="col2 item-col">{transactions[index].sender}</div>|
        <div class="col3 item-col">{transactions[index].receiver}</div>|
        <div class="col4 item-col">{transactions[index].amount}</div>|
        {#if transactions[index].asset}
          <div class="col5 item-col"><img height="50" alt="" src={transactions[index].nft.image}></div>
        {/if}
      </div>
    </VirtualList>
  {/if}
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

  .headers {
    background-color: #e7e7e7;
    font-size: 20px;
    font-weight: bold;
    height: 30px;
    padding-top: 10px;
    padding-bottom: 5px;
    border-bottom: 3px solid black;
  }

  .items {
    background-color: #e7e7e7;
    font-size: 16px;
  }

  .item-col {
    display: inline-block;
    overflow-wrap: break-word;
    padding-top: 10px;
    padding-left: 5px;
    padding-right: 5px;
  }

  .headers div{
    display: inline-block;
  }

  #h1 {
    width: 15%;
    margin: 0;
  }
  #h2 {
    width: 25%;
    margin: 0;
  }
  #h3 {
    width: 25%;
    margin: 0;
  }
  #h4 {
    width: 8%;
    margin: 0;
  }
  #h5 {
    width: 19%;
    margin: 0;
  }


  .col1 {
    width: 15%;
    margin: 0;
  }
  .col2 {
    width: 25%;
    margin: 0;
  }
  .col3 {
    width: 25%;
    margin: 0;
  }
  .col4 {
    width: 8%;
    margin: 0;
  }
  .col5 {
    width: 19%;
    margin: 0;
  }
</style>