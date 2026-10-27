import { vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";

export const jsonResponse = (body, ok = true) => Promise.resolve({ ok, json: () => Promise.resolve(body) })

export const makePinia = (initialState = {}) => {
    return createTestingPinia({ createSpy: vi.fn, stubActions: false, initialState })
}