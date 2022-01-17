<script>
    import Gallery from './Gallery.svelte';
    import { baseUrl, userState} from "../stores";
    import { onMount } from "svelte";

    let nfts = null;
    let selected = null;
    let searchText = null;
    let searchSuccess = null;
    let uploadSuccess = null;

    let files = [];
    let dataFile = null;
    let createdToken = null;

    function upload() {
        let reader = new FileReader();
        reader.onloadend = async function() {
            let options = {
                method: 'POST',
                body: JSON.stringify({image: reader.result}),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + $userState.apiKey,
                },
            };

            let response = await fetch($baseUrl + '/create_asset', options);
            let data = await response.json();

            if (!data.success) {
                uploadSuccess = false;
            } else {
                uploadSuccess = true;
                createdToken = data.token;
            }
        }
        reader.readAsDataURL(files[0]);
    }

    function handleImageSelect(event) {
        if (event.path[0].nodeName === 'IMG'){
            selected = event.path[0];
        }
	}

    async function search() {
        let options = {
            method: 'POST',
            body: JSON.stringify({token: searchText}),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        let response = await fetch($baseUrl + '/search_nft', options);
        let data = await response.json();
        if (data.success) {
            searchSuccess = true;
            selected = {
                src: data['nft'].image,
                alt: data['nft'].token + ',' + data['nft'].owner,
            }
        } else {
            searchSuccess = false;
        }
    }

    onMount(async function () {
        let response = await fetch($baseUrl + '/list_nfts');
        let data = await response.json();
        nfts = data['nfts'];
    });

</script>

<div class="main-content">
    <div class="centered-box">
        {#if $userState.loggedIn}
            <div class="creation-box">
                <input id="fileUpload" type="file" bind:files>
                {#if dataFile && files[0]}
                    <p>
                        {files[0].name}
                    </p>
                {/if}
                {#if files[0]}
                    <button on:click={upload}>Create NFT</button>
                {:else}
                    <button on:click={upload} disabled>Create NFT</button>
                {/if}
                {#if uploadSuccess !== null}
                    {#if uploadSuccess === true}
                        <p style="color: #00ff15">NFT successfully created and added to your account.
                            Please refresh the page</p>
                    {:else}
                        <p style="color: #ff0000">NFT creation failed. Please seek assistance</p>
                    {/if}
                {/if}
            </div>
        {/if}

        <div class="search-box">
            <input id="search" placeholder="Search for token..." type="text" bind:value={searchText}>
            <button on:click={search}>Search</button>
            {#if searchSuccess !== null}
                {#if !searchSuccess}
                    <p style="color: #ff0000">NFT does not exist</p>
                {/if}
            {/if}
        </div>


        {#if selected}
            <div class="nft-tools">
                <img src={selected.src} alt={selected.alt.split(",")[0]} height="100">
                <div class="tools">
                    <p>Non Fungible Token: {selected.alt.split(",")[0]}</p>
                    <p>Owner: {selected.alt.split(",")[1]}</p>
                </div>
            </div>
        {/if}

        {#if nfts}
            <div class="gallery" on:click={handleImageSelect}>
                <Gallery gap="20" maxColumnWidth="100">
                    {#each nfts as nft}
                        <img src={nft.image} alt={nft.token+','+nft.owner}>
                    {/each}
                </Gallery>
            </div>
        {/if}
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
        color:white;
    }

    .creation-box, .search-box {
        margin-bottom: 70px;
    }

	.centered-box {
		background-color: rgba(0, 0, 0, 0.9);
        border-radius: 15px;
		padding: 30px;
        width: 80%;
	}

    .nft-tools {
        padding: 0 20px 50px 50px;
        overflow: auto;
    }

    .nft-tools img {
        float: left;
    }

    #search {
        width: 700px;
    }

    .gallery :global(img) { opacity: .9; transition: all .2s }
	.gallery :global(img):hover { opacity: 1; transform: scale(1.04) }
</style>