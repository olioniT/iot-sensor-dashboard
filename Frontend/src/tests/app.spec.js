import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { mount, flushPromises } from "@vue/test-utils"
import { h } from "vue"
import { createRouter, createMemoryHistory } from "vue-router"
import App from "@/App.vue"

const { connect } = vi.hoisted(() => ({ connect: vi.fn() }))

vi.mock("@/composables/useWebSocket.js", () => ({ useWebSocket: () => ({ connect }) }))

const layout = (cls) => ({ render() { return h("div", { class: cls }, this.$slots.default?.()) } })
const page = (text) => ({ render: () => h("p", { class: "page" }, text) })

const MainLayout = layout("main-layout")
const AuthLayout = layout("auth-layout")

const makeRouter = () => {
    return createRouter({
        history: createMemoryHistory(),
        routes: [
            { path: "/", component: page("Dashboard Page"), meta: { layout: MainLayout } },
            { path: "/login", component: page("Login Page"), meta: { layout: AuthLayout } },
            { path: "/no-layout", component: page("Loose Page") },
        ]
    })
}

const mountApp = async (path = "/") => {
    const router = makeRouter()
    router.push(path)
    await router.isReady()

    const wrapper = mount(App, {
        global: { plugins: [router], stubs: { Toaster: true, Dialogs: true, Icon: true } }
    })

    return { wrapper, router }
}

beforeEach(() => connect.mockClear())
afterEach(() => vi.restoreAllMocks())

describe("App", () => {
    it("connects the websocket once on mount", async () => {
        await mountApp()
        expect(connect).toHaveBeenCalledTimes(1)
    })

    it("wraps the current page in the router's layout", async () => {
        const { wrapper } = await mountApp("/")
        const main = wrapper.get(".main-layout")
        expect(main.get(".page").text()).toBe("Dashboard Page")
    })

    it("switches layout when the route changes", async () => {
        const { wrapper, router } = await mountApp("/")

        await router.push("/login")
        await flushPromises()

        expect(wrapper.find(".main-layout").exists()).toBe(false)
        expect(wrapper.find(".auth-layout .page").text()).toBe("Login Page")
    })
})