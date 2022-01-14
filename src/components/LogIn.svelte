<script>
    import { baseUrl, userState } from '../stores.js';
    import { useForm, HintGroup, Hint, validators, email, required } from 'svelte-use-form';
    import router from 'page';

    const form = useForm();
    let success = true;
    let reason = '';

    async function onSubmit() {
        const data = {
            'email': $form.email.value,
            'password': $form.password.value,
        };

        let options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        let response = await fetch($baseUrl + '/login', options);

        let responseData = await response.json();

        if (responseData.status === 200) {
            userState.set({
                'loggedIn': true,
                'email': responseData.email,
                'address': responseData.address,
                'amount': $userState.amount,
                'admin': responseData.admin,
                'apiKey': responseData['api_key'],
            })
            router.redirect('/');
        } else {
            success = false;
            reason = responseData.reason;
        }
    }
</script>

<div class='login' id='login'>
    <div class='head'>
        <h1 class='company'>NFT Market from UPET</h1>
    </div>

    <p class='msg'>Welcome back!</p>

    {#if !success}
        <p class='msg' style='color: red'>{reason}</p>
    {/if}

    <div class='form'>
        <form use:form>
            <input
                type='email'
                placeholder='Email'
                class='text'
                id='email'
                name='email'
                use:validators={[required, email]}
            />
            <HintGroup for='email'>
                <Hint on='required'>This is a mandatory field</Hint>
                <Hint on='email' hideWhenRequired>Email is not valid</Hint>
            </HintGroup>
            <br>
            <input
                type='password'
                name='password'
                placeholder='••••••••••••••'
                class='password'
                use:validators={[required]}
            />
            <Hint for='password' on='required'>This is a mandatory field</Hint>
            <br>
            <br>
            <br>
            <button
                class='btn-login'
                disabled={!$form.valid}
                on:click|preventDefault={onSubmit}
            >
                Login
            </button>
        </form>
    </div>
</div>

<style>
    .login {
        width: 25%;
        color: white;
        /*background: #aad4e8;*/
        background: -webkit-linear-gradient(to right, #1a524b, #0c455b);
        background: linear-gradient(to right, #184d46, #093849);
        margin: auto;
        box-shadow:
        0 2px 10px rgba(0,0,0,0.2),
        0 10px 20px rgba(0,0,0,0.3),
        0 30px 60px 1px rgba(0,0,0,0.5);
        border-radius: 40px;
        padding: 50px;
    }
    .login .head {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 30px;
    }
    .login .head .company {
        font-size: 2.2em;
    }
    .login .msg {
        text-align: center;
        margin-bottom: 50px;
    }
    .login .form .text {
        border: none;
        background: none;
        box-shadow: 0 2px 0 0 white;
        width: 100%;
        color: white;
        font-size: 1em;
        outline: none;
    }
    .login .form .text::placeholder {
        color: #D3D3D3;
    }
    .login .form input[type=password].password {
        border: none;
        background: none;
        box-shadow: 0 2px 0 0 white;
        width: 100%;
        color: white;
        font-size: 1em;
        outline: none;
        margin-top: 20px;
    }
    .login .form .password::placeholder {
        color: #D3D3D3;
    }
    .login .form .btn-login {
        background: none;
        text-decoration: none;
        color: white;
        box-shadow: 0 0 0 2px white;
        border-radius: 3px;
        padding: 5px 2em;
        transition: 0.5s;
    }
    .login .form .btn-login:hover {
        background: white;
        color: dimgray;
        transition: 0.5s;
    }
</style>