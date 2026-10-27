import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
 
// Views and layouts pull in Chart.js, stores, etc. We only care about routing,
// so replace each one with an empty component.
const { stub } = vi.hoisted(() => ({
    stub: (name) => ({ default: { name, render: () => null } }),
}))

vi.mock('@/views/LoginView.vue', () => stub('LoginView'))
vi.mock('@/views/DashboardView.vue', () => stub('DashboardView'))
vi.mock('@/views/SensorsView.vue', () => stub('SensorsView'))
vi.mock('@/views/HistoryView.vue', () => stub('HistoryView'))
vi.mock('@/views/UsersView.vue', () => stub('UsersView'))
vi.mock('@/layouts/DefaultLayout.vue', () => stub('DefaultLayout'))
vi.mock('@/layouts/AuthLayout.vue', () => stub('AuthLayout'))

import router from '@/router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useUserStore } from '@/stores/user'

const logIn = (user = { id: 1, name: 'Sam', role: 2 }) => useUserStore().setUser(user)
const here = () => router.currentRoute.value
 
beforeEach(async () => {
    setActivePinia(createPinia())
    await router.replace('/login')
})

describe('auth guard', () => {
    it.each([
        '/dashboard',
        '/sensors',
        '/users',
        '/history/sensor',
        '/history/sensor/3',
        '/some/unknown/page',
    ])('sends a logged-out user from %s to /login', async (path) => {
        await router.push(path)
        expect(here().fullPath).toBe('/login')
    })
 
    it('redirects "/" to /login when logged out', async () => {
        await router.push('/')
        expect(here().name).toBe('login')
    })

    it('redirects a logged in user away from /login', async () => {
        logIn()

        await router.push("/dashboard")
        await router.push("/login")

        expect(here().name).toBe("dashboard")
    })

    it.each([
        ['/dashboard', 'dashboard'],
        ['/sensors', 'sensors'],
        ['/users', 'users'],
        ['/history/sensor/3', 'history'],
    ])('lets a logged-in user open %s', async (path, name) => {
        logIn()

        await router.push("/dashboard")
        await router.push(path)
        
        expect(here().name).toBe(name)
    })
})

describe('route table', () => {
    it.each(['dashboard', 'sensors', 'history', 'users'])('%s uses the default layout and has a title and subtitle',
        (name) => {
            const { meta } = router.resolve({ name, params: {} })
            expect(meta.layout).toBe(DefaultLayout)
            expect(meta.title).toBeTruthy()
            expect(meta.subtitle).toBeTruthy()
        },
    )
})