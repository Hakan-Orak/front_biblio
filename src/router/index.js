import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import PhotoDetails from "../views/photoDetails";
import Inscription from "../views/inscription";
import addPicture from "../views/addPicture";
import gestionImages from "../views/gestionImages";
import gestionUsers from "../views/gestionUtilisateurs";

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
  },
  {
    path: "/inscription",
    name: "inscription",
    component: Inscription,
  },
  {
    path: "/add-picture",
    name: "addPicture",
    component: addPicture,
  },
  {
    path: "/gestion-images",
    name: "gestionImages",
    component: gestionImages,
  },
  {
    path: "/gestion-users",
    name: "gestionUsers",
    component: gestionUsers,
  }
];

const router = new VueRouter({
  routes,
});

export default router;
