import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'

import '../styles/global.css'

import '../node_modules/ant-design-vue/dist/antd.min.css'

import '../node_modules/vue-loading-overlay/dist/vue-loading.css'

import '../node_modules/swiper/dist/css/swiper.css'

import '../node_modules/vue-simple-suggest/dist/styles.css'

import _6f6c098b from '../layouts/default.vue'
import _2d283996 from '../layouts/post.vue'

const layouts = { "_default": _6f6c098b,"_post": _2d283996 }

export default {
  head: {"title":"Tìm phòng thật dễ với Housie","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"name":"application-name","content":"Housie"},{"name":"robots","content":"index,follow"},{"name":"googlebot","content":"index,follow"},{"name":"google","content":"nositelinkssearchbox"},{"name":"google","content":"notranslate"},{"hid":"description","name":"description","content":"Tìm, thuê phòng thật dễ với Housie"},{"itemprop":"name","content":"Tìm phòng thật dễ với Housie"},{"itemprop":"description","content":"Tìm, thuê phòng thật dễ với Housie"},{"itemprop":"image","content":"The Name or Title Here"},{"name":"twitter:card","content":"product"},{"name":"twitter:site","content":"@publisher_handle"},{"name":"twitter:title","content":"Tìm phòng thật dễ với Housie"},{"name":"twitter:description","content":"Tìm, thuê phòng thật dễ với Housie"},{"name":"twitter:creator","content":"@author_handle"},{"name":"twitter:image","content":""},{"property":"og:title","content":"Tìm phòng thật dễ với Housie"},{"property":"og:type","content":"article"},{"property":"og:url","content":""},{"property":"og:image","content":""},{"property":"og:description","content":"Tìm, thuê phòng thật dễ với Housie"},{"property":"og:site_name","content":""},{"property":"og:price:amount","content":"1000000"},{"property":"og:price:currency","content":"VNĐ"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"stylesheet","type":"text\u002Fcss","href":"\u002Fcss\u002Fall.min.css"}],"style":[],"script":[]},

  render(h, props) {
    const loadingEl = h('NuxtLoading', { ref: 'loading' })
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      },
      on: {
        beforeEnter(el) {
          // Ensure to trigger scroll event after calling scrollBehavior
          window.$nuxt.$nextTick(() => {
            window.$nuxt.$emit('triggerScroll')
          })
        }
      }
    }, [ templateEl ])

    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,
      transitionEl
    ])
  },
  data: () => ({
    isOnline: true,
    layout: null,
    layoutName: ''
  }),
  beforeCreate() {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created() {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (process.client) {
      window.$nuxt = this
      this.refreshOnlineStatus()
      // Setup the listeners
      window.addEventListener('online', this.refreshOnlineStatus)
      window.addEventListener('offline', this.refreshOnlineStatus)
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },

  mounted() {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },

  computed: {
    isOffline() {
      return !this.isOnline
    }
  },
  methods: {
    refreshOnlineStatus() {
      if (process.client) {
        if (typeof window.navigator.onLine === 'undefined') {
          // If the browser doesn't support connection status reports
          // assume that we are online because most apps' only react
          // when they now that the connection has been interrupted
          this.isOnline = true
        } else {
          this.isOnline = window.navigator.onLine
        }
      }
    },

    errorChanged() {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },

    setLayout(layout) {
      if(layout && typeof layout !== 'string') throw new Error('[nuxt] Avoid using non-string value as layout property.')

      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    }
  },
  components: {
    NuxtLoading
  }
}
