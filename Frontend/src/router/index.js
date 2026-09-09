import { createRouter, createWebHashHistory } from "vue-router"

import LoginView from "../views/LoginView.vue"
import SensorsView from "../views/SensorsView.vue"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            // redirect: "/dashboard"
            component: SensorsView
        },
        {
            path: "/login",
            component: LoginView
        },
        {
            path: "/dashboard",
            component: SensorsView
        },
        {
            path: '/:pathMatch(.*)*',
            component: {
                template: '<h1>Route Not Found</h1>'
            }
        }
    ]
})

router.beforeEach((to) => {
    // authentication protection here
})

export default router