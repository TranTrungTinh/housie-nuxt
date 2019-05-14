import Vue from 'vue';
if (process.browser) {
    const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr.js');
    Vue.use(VueAwesomeSwiper);
}