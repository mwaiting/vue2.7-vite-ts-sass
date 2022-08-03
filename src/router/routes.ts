import { RouteConfig } from "vue-router";

export const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: () => import ('@/views/home/index.vue'),
        meta: {
            title: '首页'
        }
    }
]