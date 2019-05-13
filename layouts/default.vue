<template>
    <a-layout :style="[styles]" class="layout">
      <a-layout-header>
        <the-header></the-header>
      </a-layout-header>
      <a-layout-content>
          <nuxt />
          <!-- Setup vue progress bar -->
          <!-- <vue-progress-bar></vue-progress-bar> -->
      </a-layout-content>
      <a-layout-footer>
          <the-footer></the-footer>
      </a-layout-footer>
    </a-layout>
</template>
<script>
import { TheHeader } from '@/components/header';
import { EventBus } from '@/helpers/event-bus';
import { TheFooter } from '@/components/footer';

export default {
    components: { TheHeader, TheFooter },
    data () {
        return {
            styles: {
                // transform: 'translate(250px)'
            }
        }
    },
    mounted () {
      EventBus.$on('toggleDrawer', (isShow) => {
          if(isShow) {
              this.styles = { transform: 'translate(250px)' }
          } else {
              this.styles = { transform: 'translate(0px)' }
          }
      })
    },
    destroyed() {
      EventBus.$off('toggleDrawer');
    }
}
</script>
<style src="./default.scss" lang="scss" scoped></style>
