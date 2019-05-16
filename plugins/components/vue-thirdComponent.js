import Vue from 'vue';
import { VueTyper } from 'vue-typer';
import Spiner from 'vue-loading-overlay';
import GoogleLogin from 'vue-google-login';
import VFacebookLogin from 'vue-facebook-login-component';
import VueSimpleSuggest from 'vue-simple-suggest';

Vue.component('Typed', VueTyper);
Vue.component('GoogleLogin', GoogleLogin);
Vue.component('VFacebookLogin', VFacebookLogin);
Vue.component('vue-simple-suggest', VueSimpleSuggest)
Vue.component('Spiner', Spiner);