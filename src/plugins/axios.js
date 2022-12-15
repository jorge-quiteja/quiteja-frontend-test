import axios from 'axios';

const api = axios.create({
    baseURL: 'https://dummyapi.io/data/v1/',
    timeout: 2000,
    headers: { 
        'app-id': '630f9c880b1fb40b807c0fb6',
        'Content-Type': 'application/json',
     }
});

export default api;