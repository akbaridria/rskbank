import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import RskBridge from "@/views/RskBridge.vue";
import SovBridge from "@/views/SovBridge.vue";
import Adresses from "@/views/Adresses.vue";
import About from "@/views/About.vue"
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/rsk-token-bridge",
    name: "RskBridge",
    component: RskBridge,
  },
  {
    path: "/sov-token-bridge",
    name: "SovBridge",
    component: SovBridge,
  },
  {
    path: "/adresses",
    name: "Adresses",
    component: Adresses,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;