import { createRouter, createWebHistory } from "vue-router";
import PersonalCabinetMain from "../layout/PersonalCabinetMain.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "PersonalCabinetMain",
      component: PersonalCabinetMain,

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
        {
          path: "/not-found",
          name: "NotFountd",
          component: () => import("@/views/NotFound.vue"),
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
      name: "Forgot",
      component: () => import("@/views/ForgotPassword.vue"),
    },
    {
      path: "/result",
      name: "Result",
      component: () => import("@/views/Result.vue"),
    },

    {
      path: "/expired-token",
      name: "ExpiredToken",
      component: () => import("../views/ExpiredToken.vue"),
    },
  ],
});
