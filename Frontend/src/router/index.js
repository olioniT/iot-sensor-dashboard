import { useUserStore } from '../stores/user.js';
import { createRouter, createWebHashHistory } from "vue-router"

import LoginView from "../views/LoginView.vue"
import DashboardView from "../views/DashboardView.vue"
import SensorsView from "../views/SensorsView.vue"
import HistoryView from "../views/HistoryView.vue"
import UsersView from "../views/UsersView.vue"

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
            name: "login",
            component: LoginView,
            meta: { layout: AuthLayout }
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: DashboardView,
            meta: { title: "Main Dashboard", subtitle: "Live overview of the current sensor data.", layout: DefaultLayout }
        },
        {
            path: "/sensors",
            name: "sensors",
            component: SensorsView,
            meta: { title: "Sensors List", subtitle: "List of every sensor.", layout: DefaultLayout }
        },
        {
            path: "/history/sensor/:id?",
            name: "history",
            component: HistoryView,
            props: true,
            meta: { title: "History Overview", subtitle: "Trends and statistics for each sensor over time.", layout: DefaultLayout },
        },
        {
            path: "/users",
            name: "users",
            component: UsersView,
            meta: { title: "Users List", subtitle: "View every current user and their level of permissions.", layout: DefaultLayout }
        },
        {
            path: '/:pathMatch(.*)*',
            component: { template: '<h1>Route Not Found</h1>' }
        }
    ]
})

router.beforeEach(async (to) => {
    const userStore = useUserStore()

    const isLoggedIn = userStore.userIsLoggedIn()

    if (!isLoggedIn && to.name !== "login") {
        return "/login"
    }
    return true
    // authentication protection here
})

export default router