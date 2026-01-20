import axios from 'axios';
import API_CONFIG from './api-config';

const callapi = axios.create({
    baseURL:API_CONFIG.BASE_URL,
    timeout: 100000,
    headers: {
        'Content-Type' : 'application/json',
    }
});

export default callapi;

