import Vue from "vue";
import VueRouter from "vue-router";
import AppHeader from "@/layout/AppHeader";
import AppFooter from "@/layout/AppFooter";
import Home from "@/views/Home.vue";
import CharSheetDetail from "@/views/CharSheetDetail";
import CharSheetCreate from "@/views/CharSheetCreate";
import Login from "@/views/Login";
import Logout from "@/views/Logout";
import Registration from "@/views/Registration";

Vue.use(VueRouter);

const routes = [
  {
    path     : "/",
    name     : "Home",
    components: {
      header : AppHeader,
      default: Home,
      footer : AppFooter
    }
  },
  {
    path: "/charsheet/create",
    name: "Create Charsheet",
    components: {
      header : AppHeader,
      default: CharSheetCreate,
      footer : AppFooter
    },
  },
  {
    path: "/charsheet/:id(\\d+)",
    name: "Detail",
    components: {
      header : AppHeader,
      default: CharSheetDetail,
      footer : AppFooter
    },
  },
  {
    path: "/login",
    name: "Login",
    components: {
      header : AppHeader,
      default: Login,
      footer : AppFooter
    }
  },
  {
    path: "/logout",
    name: "Logout",
    components: {
      header : AppHeader,
      default: Logout,
      footer : AppFooter
    }
  },
  {
    path: "/registration",
    name: "Registration",
    components: {
      header : AppHeader,
      default: Registration,
      footer : AppFooter
    }
  }
];

const router = new VueRouter({
  mode: "history",
  linkExactActiveClass: "active",
  base: process.env.BASE_URL,
  routes
});

export default router;
