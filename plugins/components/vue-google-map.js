import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDdz60EXJYfX_e3wsTS-2DrXMfACXKbB10',
    libraries: 'places',
    region: 'VI',
    language: 'vi'
  }
});