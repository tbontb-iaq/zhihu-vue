import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:path(.*)*",
      name: "not-found",
      component: () => import("@/views/NotFound.vue"),
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/answer/:id(\\d+)",
      name: "answer",
      component: () => import("@/views/AnswerView.vue"),
    },
    {
      path: "/question/:id(\\d+)",
      name: "question",
      component: () => import("@/views/QuestionView.vue"),
    },
    {
      path: "/article/:id(\\d+)",
      name: "article",
      component: () => import("@/views/ArticleView.vue"),
    },
    {
      path: "/pin/:id(\\d+)",
      name: "pin",
      component: () => import("@/views/PinView.vue"),
      children: [
        {
          path: "/:type(pin)/:id(\\d+)/root_comment",
          name: "pin-comment",
          component: () => import("@/views/CommentView.vue"),
        },
      ],
    },
    {
      path: "/:type/:id(\\d+)/root_comment",
      name: "root-comment",
      component: () => import("@/views/CommentView.vue"),
    },
    {
      path: "/comment/:id(\\d+)/child_comment",
      name: "child-comment",
      component: () => import("@/views/ChildComment.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/draft",
      name: "draft",
      component: () => import("@/views/DraftView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"),
    },
  ],
});

export default router;
