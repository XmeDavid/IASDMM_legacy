import { createRouter, createWebHashHistory } from "vue-router";
import Program from "../views/Program.vue";
import Settings from "../views/Settings.vue";
import Bible from "../views/Bible.vue";
import HymnOld from "../views/HymnOld.vue";

const routes = [
    {
      path: '/',
      name: 'Program',
      component: Program
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/bible',
      name: 'Bible',
      component: Bible
    },
    {
      path: '/hymn_old',
      name: 'HymnOld',
      component: HymnOld
    }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

/*
router.beforeEach((to, from, next) => {
  if (to.name === "Login" || to.name === "Home") {
    next();
    return;
  }
  if (!store.state.user) {
    next({ name: "Login" });
    return;
  }
  /*if (to.name == 'User') {
      if ((store.state.user.type == 'A') || (store.state.user.id == to.params.id)) {
        next()
        return
      }
      next(false)
      return
    }*
  next();
});
 */
export default router;
