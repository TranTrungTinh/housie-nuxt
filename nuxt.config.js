
module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Tìm phòng thật dễ với Housie',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // Name of web application (only should be used if the website is used as an app)
      { name: "application-name", content: "Housie"},
      // Control the behavior of search engine crawling and indexing
      { name: "robots", content: "index,follow"},
      { name: "googlebot", content: "index,follow"},
      // Tells Google not to show the sitelinks search box
      { name: 'google', content: 'nositelinkssearchbox'},
      // Tells Google not to provide a translation for this document
      { name: 'google', content: 'notranslate'},
      { hid: 'description', name: 'description', content: 'Tìm, thuê phòng thật dễ với Housie' },

      // Meta markup for Google+
      { itemprop:"name" , content:"Tìm phòng thật dễ với Housie"  },
      { itemprop:"description" , content:"Tìm, thuê phòng thật dễ với Housie"  },
      { itemprop:"image" , content:"The Name or Title Here"  },

      // Meta markup for Twitter
      { name: 'twitter:card', content: 'product' },
      { name: 'twitter:site', content: '@publisher_handle' },
      { name: 'twitter:title', content: 'Tìm phòng thật dễ với Housie' },
      { name: 'twitter:description', content: 'Tìm, thuê phòng thật dễ với Housie' },
      { name: 'twitter:creator', content: '@author_handle' },
      { name: 'twitter:image', content: '' },

      // Meta markup for Facebook
      { property: 'og:title', content: 'Tìm phòng thật dễ với Housie' },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: '' },
      { property: 'og:image', content: '' },
      { property: 'og:description', content: 'Tìm, thuê phòng thật dễ với Housie' },
      { property: 'og:site_name', content: '' },
      { property: 'og:price:amount', content: '1000000' },
      { property: 'og:price:currency', content: 'VNĐ' }

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
    '~styles/global.css',
    'ant-design-vue/dist/antd.min.css',
    'vue-loading-overlay/dist/vue-loading.css',
    'swiper/dist/css/swiper.css',
    'vue-simple-suggest/dist/styles.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/components/core-component.js' },
    { src: '~plugins/components/vue-lazyload.js' },
    { src: '~plugins/components/vue-thirdComponent.js', ssr: false},
    { src: '~plugins/components/vue-swiper.js', ssr: false },
    { src: "~plugins/components/vue-google-map.js", ssr: true },

    { src: '~plugins/filters/currency.js'},
    { src: '~plugins/filters/fromNow.js'},
  ],

  /*
  ** Nuxt.js serverMiddleware
  */
  serverMiddleware: [
    { 
      path: '/post', 
      handler: (req, res, next) => { 
        res.spa = true; 
        next();
      } 
    }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    transpile: [/^vue2-google-maps($|\/)/],
    extend(config, ctx) {}
  }
}
