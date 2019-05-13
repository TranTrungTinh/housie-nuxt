import Vue from 'vue';

const moment = require('moment');
const timeFromNow = days => moment(days).locale('vi').fromNow();
Vue.filter('fromNow', timeFromNow);
