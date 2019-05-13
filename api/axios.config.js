import axios from 'axios';
import axiosRetry from 'axios-retry';
axiosRetry(axios, { retries: 3 });

// @Axios config
axios.defaults.baseURL = 'https://skg-housing.herokuapp.com/api';
axios.defaults.headers.get['Accepts'] = 'application/json';

export { axios };