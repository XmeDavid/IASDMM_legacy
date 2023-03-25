import { createRouter, createWebHashHistory } from "vue-router";
import Program from "../components/program/Program.vue";
import Settings from "../components/settings/Settings.vue";
import Bible from "../components/bible/Bible.vue";
import HymnOld from "../components/old_hymnal/HymnOld.vue";
import HymnNew from "../components/new_hymnal/HymnNew.vue";

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
    },
    {
      path: '/hymn_new',
      name: 'HymnNew',
      component: HymnNew
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
