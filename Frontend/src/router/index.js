import { useUserStore } from '@/stores/user.js';
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
            meta: { requiresAuth: false, layout: AuthLayout }
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: DashboardView,
            meta: { requiresAuth: true, title: "Main Dashboard", subtitle: "Live overview of the current sensor data.", layout: DefaultLayout }
        },
        {
            path: "/sensors",
            name: "sensors",
            component: SensorsView,
            meta: { requiresAuth: true, title: "Sensors List", subtitle: "List of every sensor.", layout: DefaultLayout }
        },
        {
            path: "/history/sensor/:id?",
            name: "history",
            component: HistoryView,
            props: true,
            meta: { requiresAuth: true, title: "History Overview", subtitle: "Trends and statistics for each sensor over time.", layout: DefaultLayout },
        },
        {
            path: "/users",
            name: "users",
            component: UsersView,
            meta: { requiresAuth: true, title: "Users List", subtitle: "Manage users and their permissions.", layout: DefaultLayout }
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: "/dashboard"
        }
    ]
})

router.beforeEach(async (to) => {
    const userStore = useUserStore()

    const isLoggedIn = userStore.userIsLoggedIn()

    if (to.meta.requiresAuth && !isLoggedIn) {
        return "/login"
    }

    if (isLoggedIn && to.name === "login") {
        return "/dashboard"
    }
})

export default router