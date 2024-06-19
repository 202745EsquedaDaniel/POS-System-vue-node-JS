import axios from 'axios';

const instance = axios.create({
    baseURL: "https://pos-system-vue-node-js-production.up.railway.app/Api/v1"
})

export default instance;