import Cookies from 'js-cookie';

export default {
    set(key, token) {
      Cookies.set(key, token);
    },

    get(key) {
        return Cookies.get(key) || '';
    },

    remove(key) {
        Cookies.remove(key);
    }
}