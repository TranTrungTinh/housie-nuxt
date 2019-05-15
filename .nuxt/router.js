import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _351a17f5 = () => interopDefault(import('../pages/account/index.vue' /* webpackChunkName: "pages/account/index" */))
const _22f9a824 = () => interopDefault(import('../pages/post/index.vue' /* webpackChunkName: "pages/post/index" */))
const _23d8ed4a = () => interopDefault(import('../pages/posts/index.vue' /* webpackChunkName: "pages/posts/index" */))
const _072b3319 = () => interopDefault(import('../pages/post/_postId/index.vue' /* webpackChunkName: "pages/post/_postId/index" */))
const _3d5dbf11 = () => interopDefault(import('../pages/post/_postId/task/index.vue' /* webpackChunkName: "pages/post/_postId/task/index" */))
const _b26b3ebe = () => interopDefault(import('../pages/post/_postId/task/_taskId/index.vue' /* webpackChunkName: "pages/post/_postId/task/_taskId/index" */))
const _28881a57 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'

    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })
  }
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: decodeURI('/'),
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/account",
      component: _351a17f5,
      name: "account"
    }, {
      path: "/post",
      component: _22f9a824,
      name: "post"
    }, {
      path: "/posts",
      component: _23d8ed4a,
      name: "posts"
    }, {
      path: "/post/:postId",
      component: _072b3319,
      name: "post-postId"
    }, {
      path: "/post/:postId/task",
      component: _3d5dbf11,
      name: "post-postId-task"
    }, {
      path: "/post/:postId/task/:taskId",
      component: _b26b3ebe,
      name: "post-postId-task-taskId"
    }, {
      path: "/",
      component: _28881a57,
      name: "index"
    }],

    fallback: false
  })
}
