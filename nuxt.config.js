
module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Housie',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'My ace Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/all.min.css' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FD3D76', height: '2px', duration: 500 },

  /*
  ** Global CSS
  */
  css: [
    '~styles/global.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/components/core-component.js' },
    { src: '~plugins/components/vue-progress.js' },
    { src: '~plugins/components/vue-loading.js' },
    { src: '~plugins/components/vue-lazyload.js' },
    { src: '~plugins/components/vue-typer.js', ssr: false},

    { src: '~plugins/filters/currency.js'},
    { src: '~plugins/filters/fromNow.js'},
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
