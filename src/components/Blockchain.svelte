<script>
  import VirtualList from 'svelte-tiny-virtual-list';
  import {onMount} from "svelte";
  import { baseUrl } from '../stores.js'

  let scrollToIndex = 1;
  let blocks = [{index:0, data:[]}];

  onMount(async function () {
    let options = {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
          'Content-Type': 'application/json'
      },
    };

    let response = await fetch($baseUrl + '/get_blocks', options)
    let data = await response.json();

    blocks = data.blocks.reverse();
    console.log(blocks);
  });
</script>

<div class="main-content">
  {#await blocks}
    <p>Loading...</p>
  {:then blocks}
    <p style="color: white">Scroll to index:</p>
    <input
        type="number"
        placeholder="Scroll to index..."
        class="input" bind:value={scrollToIndex}
        min="1"
        max={blocks.length - 1}
        style="width:200px"
    >
    <VirtualList
        width="80%"
        height={950}
        itemCount={blocks.length - 1}
        itemSize={450}
        scrollToIndex={blocks.length - scrollToIndex - 1}
    >
      <div slot="item" let:index let:style {style}>
        <div class="block">
          <table>
            <tr>
              <td colspan="100%">Index:</td>
            </tr>
            <tr>
              <td colspan="100%"><b>{blocks[index]['index']}</b></td>
            </tr>
            <tr>
              <td colspan="100%">Proof Number:</td>
            </tr>
            <tr>
              <td colspan="100%">{blocks[index]['proof_number']}</td>
            </tr>
            <tr>
              <td colspan="100%">Current Hash:</td>
            </tr>
            <tr>
              <td colspan="100%">{blocks[index]['current_hash']}</td>
            </tr>
            <tr>
              <td colspan="100%">Previous Hash:</td>
            </tr>
            <tr>
              <td colspan="100%">{blocks[index]['previous_hash']}</td>
            </tr>
            <tr>
              <td colspan="100%">Data:</td>
            </tr>
            <tr>
              {#if blocks[index]['data'].length !== 0 }
                {#each blocks[index]['data'] as transaction}
                  <td class="transaction-box">
                    Sender: {transaction['sender']} <br> <br>
                    Receiver: {transaction['receiver']} <br> <br>
                    Amount: <b>{transaction['amount']}</b> <br>
                  </td>
                {/each}
              {:else}
                <td class="transaction-box"></td>
              {/if}
            </tr>
            <tr>
              <td colspan="100%">Timestamp:</td>
            </tr>
            <tr>
              <td colspan="100%">{new Date(blocks[index]['timestamp']).toLocaleString()}</td>
            </tr>
          </table>
        </div>
      </div>
    </VirtualList>
  {/await}
</div>

<style>
  .main-content {
    width: 100%;
    display: grid;
    place-items: center;
    background-color: rgba(0, 0, 0, 0.9);
    border-radius: 15px;
    padding-top: 50px;
  }

  table {
    text-align: center;
    margin: auto;
    width: 100%;
  }

  .block {
    background-color: #e7e7e7;
    border-radius: 20px;
    margin: auto;
    width: 80%;
  }

  .transaction-box {
    background-color: #d0d0d0;
    border-radius: 20px;
    height: 80px;
    word-break: break-all;
    word-wrap: break-word;
    width: 200px;
  }
</style>