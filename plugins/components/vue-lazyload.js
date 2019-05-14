import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'https://media.tenor.com/images/3c1e99287e04732354ce044e02a26e57/tenor.gif',
  loading: 'https://media.giphy.com/media/11FuEnXyGsXFba/giphy.gif',
  attempt: 1,
  listenEvents: [ 'scroll' ]
})