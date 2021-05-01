import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import PhotoDetails from "../views/photoDetails"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/photo-details",
    name: "photoDetails",
    component: PhotoDetails,
  }
];

const router = new VueRouter({
  routes,
});

export default router;
