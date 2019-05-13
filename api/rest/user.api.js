import { axios } from '@/api/axios.config';

export default {
  getInfo() {
    return axios.get('/Accounts/getInfo');
  }
}