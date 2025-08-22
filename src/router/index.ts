import { createRouter, createWebHistory } from "vue-router";
import { EnumTools } from "../types";
import EditorDiff from "../views/EditorDiff.vue";
import EditorDouble from "../views/EditorDouble.vue";

const routes = [
  { path: "", redirect: { name: EnumTools.TEXT_DIFF } },
  {
    path: "/",
    children: [
      {
        name: EnumTools.TEXT_DIFF,
        component: EditorDiff,
      },
      {
        name: EnumTools.TEXT_SIZE,
        component: EditorDouble,
      },
      {
        name: EnumTools.URL_PARSE,
        component: EditorDouble,
      },
    ].map((route) => {
      return {
        ...route,
        path: route.name, // 使用工具名称作为路径
      }
    }),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
