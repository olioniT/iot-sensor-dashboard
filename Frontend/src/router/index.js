import { createRouter, createWebHashHistory } from "vue-router"

import LoginView from "../views/LoginView.vue"
import SensorsView from "../views/SensorsView.vue"

import DefaultLayout from "../layouts/DefaultLayout.vue"
import AuthLayout from "../layouts/AuthLayout.vue"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            redirect: "/login"
        },
        {
            path: "/login",
            component: LoginView,
            meta: { layout: AuthLayout }
        },
        {
            path: "/dashboard",
            component: SensorsView,
            meta: { layout: DefaultLayout }
        },
        {
            path: '/:pathMatch(.*)*',
            component: { template: '<h1>Route Not Found</h1>' }
        }
    ]
})

router.beforeEach((to) => {
    // authentication protection here
})

export default router