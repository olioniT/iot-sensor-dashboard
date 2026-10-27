import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { setActivePinia, createPinia } from "pinia"
import { useUserStore } from "@/stores/user"
import { jsonResponse } from "@/tests/helpers"

let store

beforeEach(() => {
    setActivePinia(createPinia())
    store = useUserStore()
    fetch.mockReset()
    vi.spyOn(console, "error").mockImplementation(() => {})
})

afterEach(() => vi.restoreAllMocks())

describe("session state", () => {
    it('is not logged in until a user is set', () => {
        expect(store.userIsLoggedIn()).toBe(false)
        store.setUser({ id: 1, name: 'Sam', role: 2 })
        expect(store.userIsLoggedIn()).toBe(true)
        expect(store.getCurrentUser.name).toBe('Sam')
    })

    it('isUserAdmin is true only for role 1', () => {
        store.setUser({ id: 1, role: 1 })
        expect(store.isUserAdmin()).toBe(true)
        store.setUser({ id: 2, role: 2 })
        expect(store.isUserAdmin()).toBe(false)
    })

    it('isUserAdmin is false when nobody is logged in', () => {
        expect(store.isUserAdmin()).toBe(false)
    })
})

describe('roles', () => {
    it('getRoleOfUser finds a role by id', () => {
        store.roles = [{ id: 1, name: 'Admin' }, { id: 2, name: 'User' }]
        expect(store.getRoleOfUser(1).name).toBe('Admin')
        expect(store.getRoleOfUser(2).name).toBe('User')
        expect(store.getRoleOfUser(9)).toBeUndefined()
    })
})