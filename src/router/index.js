import { createRouter, createWebHistory } from "vue-router";
import PersonalCabinetMain from "../layout/PersonalCabinetMain.vue";

// const checkAuth = (to, from, next) => {
//   const requireAuth = to?.meta?.auth;

//   // next("/auth");
//   // if (requireAuth) {
//   //   next("/auth");
//   // }

//   if (requireAuth) next({ name: "Auth" });
// };

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "PersonalCabinetMain",
      component: PersonalCabinetMain,
      // beforeEnter: checkAuth,
      // meta: {
      //   auth: true,
      // },
      children: [
        {
          path: "/orders",
          name: "Orders",
          component: () => import("../views/MyOrdersTabs.vue"),
        },
        {
          path: "/data",
          name: "Data",
          component: () => import("../views/MyDataTabs.vue"),
        },
        {
          path: "/help",
          name: "Help",
          component: () => import("@/views/help/HelpTabs.vue"),
        },
      ],
    },
    {
      path: "/registration",
      name: "Registration",
      component: () => import("@/views/Registration.vue"),
    },
    {
      path: "/auth",
      name: "Auth",
      component: () => import("@/views/Auth.vue"),
    },
    {
      path: "/forgot-password",
      name: "forgot",
      component: () => import("@/views/ForgotPassword.vue"),
    },
    {
      path: "/result",
      name: "result",
      component: () => import("@/views/Result.vue"),
    },
  ],
});
