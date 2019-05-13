import Cookies from 'js-cookie';

export default {
    set(key, token) {
      Cookies.set(key, token, { expires: 30, secure: true });
    },

    get(key) {
        return Cookies.get(key) || '';
    },

    remove(key) {
        Cookies.remove(key);
    }
}