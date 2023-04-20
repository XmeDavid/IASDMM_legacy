import { createRouter, createWebHashHistory } from "vue-router";
import PresentationView from "../PresentationView.vue";
import Program from "../components/program/Program.vue";
import Settings from "../components/settings/Settings.vue";
import Bible from "../components/bible/Bible.vue";
import HymnOld from "../components/old_hymnal/HymnOld.vue";
import HymnNew from "../components/new_hymnal/HymnNew.vue";
import OldHymnalView from "../components/presentation_views/OldHymnalView.vue";
import TitleView from "../components/presentation_views/TitleView.vue";
import ImageView from "../components/presentation_views/ImageView.vue";
import LogoOverTextView from "../components/presentation_views/LogoOverTextView.vue";
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
    },
    {
      path: '/presentation_view',
      name: 'PresentationView',
      component: PresentationView
    },
    {
      path: '/presentation_view/title',
      name: 'TitleView',
      component: TitleView,
    },
    {
      path: '/presentation_view/old_hymnal',
      name: 'OldHymnalView',
      component: OldHymnalView,
    },{
      path: '/presentation_view/imgae',
      name: 'ImageView',
      component: ImageView,
    },
    {
      path: '/presentation_view/logo_over_text',
      name: 'LogoOverTextView',
      component: LogoOverTextView,
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
