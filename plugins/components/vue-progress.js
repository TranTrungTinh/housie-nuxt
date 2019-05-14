import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';
const progressOptions = {
    color: "#FD3D76",
    failedColor: "#44bd32",
    thickness: "3px",
    transition: {
      speed: "0.2s",
      opacity: "0.6s",
      termination: 300
    },
    autoFinish: false,
    autoRevert: true,
    inverse: false
};
Vue.use(VueProgressBar, progressOptions);
