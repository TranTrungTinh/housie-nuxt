import axios from 'axios';
import axiosRetry from 'axios-retry';
axiosRetry(axios, { retries: 3 });

// @Axios config
// axios.defaults.baseURL = 'https://skg-housing.herokuapp.com/api'; // Production
axios.defaults.baseURL = 'https://housie-dev.herokuapp.com/api'; // Development
axios.defaults.headers.get['Accepts'] = 'application/json';

export { axios };