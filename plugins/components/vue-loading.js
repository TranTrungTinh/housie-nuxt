import Vue from 'vue';
import Loading from 'vue-loading-overlay';
const loadingOptions = {
  color: '#FD3D76',
  loader: 'spinner',
  width: 100,
  height: 100,
  zIndex: 9999,
}
Vue.use(Loading, loadingOptions);
