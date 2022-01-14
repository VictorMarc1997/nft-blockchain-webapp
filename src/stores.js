import { writable, readable } from 'svelte/store';

export const baseUrl = readable('http://127.0.0.1:5000');

export const userState = writable({
    'loggedIn': false,
    'email': null,
    'address': null,
    'amount': null,
    'admin': false,
    'apiKey': null,
});