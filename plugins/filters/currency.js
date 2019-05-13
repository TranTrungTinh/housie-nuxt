import Vue from 'vue';

const currency = (val) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const thousand = (val) => {
    return `${val}000`;
}

Vue.filter('currency', currency);
Vue.filter('thousand', thousand);
