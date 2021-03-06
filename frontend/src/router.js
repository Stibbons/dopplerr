import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),

  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: load('pages'),
      // sub-routes
      children: [
        { path: '/home', component: load('pages/home') },
        { path: '/events', component: load('pages/events') },
        { path: '/movies', component: load('pages/movies') },
        { path: '/series', component: load('pages/series') },
        { path: '/status', component: load('pages/status') },
        { path: '/logs', component: load('pages/logs') },
        { path: '/about', component: load('pages/about') },
        { path: '*', component: load('404') }, // Not found
      ]
    },

    // Always leave this last one
    { path: '*', component: load('404') }, // Not found
  ]
})
