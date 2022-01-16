<script>
    // List of navigation items
    import {onMount} from "svelte";
    import { baseUrl, userState } from '../stores.js';
    import router from "page";

    let status = "offline";

    onMount(async function () {
        let response = await fetch($baseUrl + '/status');
        let data = await response.json();
        status = data['bc_status'];
    });

    function logOut() {
        userState.set({
            'loggedIn': false,
            'email': null,
            'address': null,
            'amount': null,
            'admin': false,
            'apiKey': null,
        })
        router.redirect('/');
    }
</script>

<div>
    <nav>
        <div class="inner">
            <ul class="navbar-list">
                <a href="/" style="margin-top:10px;">
                    {#if status === 'online'}
                        <li>Status<br><span class="dot" style="background-color: #00ff15"></span></li>
                    {:else}
                        <li>Status<br><span class="dot" style="background-color: #ff0000"></span></li>
                    {/if}
                </a>
                <li>
                    <a href="/blockchain">Blockchain</a>
                </li>
                <li>
                    <a href="/nfts">NFTs</a>
                </li>
                {#if $userState.loggedIn}
                    <li>
                        <a href="/transactions">Transactions</a>
                    </li>
                    <li>
                        <a href="/">My account</a>
                    </li>
                    <li>
                        <a href="/" on:click={logOut}>Log out</a>
                    </li>
                {:else}
                    <li>
                        <a href="/login">Log In</a>
                    </li>
                {/if}
            </ul>
        </div>
    </nav>
    <div class="logo">
        <a href="/"><img src="images/logo.png" alt="logo" height="100px"/></a>
    </div>
</div>

<style>
    nav {
        background-color: rgba(0, 0, 0, 0.9);
        height: 100px;
        float: right;
        border-radius: 15px;
    }

    .inner {
        max-width: 980px;
        padding-left: 20px;
        padding-right: 20px;
        margin: auto;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        height: 100%;
    }

    .logo{
        float: left;
        margin-left: 100px;
    }

    .navbar-list {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin: 0;
        padding: 0;
    }

    .navbar-list li {
        color: #ffffff;
        list-style-type: none;
        position: relative;
        padding: 10px;
        margin-left: 10px;
        margin-right: 10px;
    }

    .navbar-list a {
        color: #ffffff;
        text-decoration: none;
        display: inline-flex;
        height: 45px;
        align-items: center;
        padding: 0 10px;
        font-size: 18px;
    }

    .navbar-list a:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        transform: scaleX(0);
        background-color: #ff0505;
        transform-origin: bottom right;
        transition: transform 0.25s ease-out;
    }

    .navbar-list a:hover:after {
        transform: scaleX(1);
        transform-origin: bottom left;
    }

    .dot {
        height: 15px;
        width: 15px;
        margin-top: 10px;
        border-radius: 50%;
        display: inline-block;
    }

</style>