import Vue from "vue";
import VueRouter from "vue-router";
import AppHeader from "../layout/AppHeader";
import AppFooter from "../layout/AppFooter";
import Home from "../views/Home.vue";
import CharSheet from "../views/CharSheet.vue";

Vue.use(VueRouter);

const routes = [
  {
    path     : "/",
    name     : "Home",
    components: {
      header : AppHeader,
      default: CharSheet,
      footer : AppFooter
    }
  },
  {
    path     : "/about",
    name     : "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  linkExactActiveClass: "active",
  base: process.env.BASE_URL,
  routes
});

export default router;
