import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
 
let useToast
 
beforeEach(async () => {
    vi.useFakeTimers()
    let n = 0
    vi.stubGlobal('crypto', { randomUUID: () => `id-${++n}` })
    vi.resetModules()
    ;({ useToast } = await import('@/composables/useToast'))
})
 
afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
})
 
describe('useToast', () => {
    it('queues a toast with sensible defaults', () => {
        const { show, toastQueue } = useToast()
        show('Hello')

        expect(toastQueue).toHaveLength(1)
        expect(toastQueue[0]).toMatchObject({ id: 'id-1', message: 'Hello', type: 'info', duration: 5000 })
    })

    it('uses the type and duration it is given', () => {
        const { show, toastQueue } = useToast()
        show('Saved', 'success', 1500)
        expect(toastQueue[0]).toMatchObject({ type: 'success', duration: 1500 })
    })

    it('removes a toast automatically once its duration has passed', () => {
        const { show, toastQueue } = useToast()
        show('bye', 'info', 1000)

        vi.advanceTimersByTime(999)
        expect(toastQueue).toHaveLength(1)
        vi.advanceTimersByTime(1)
        expect(toastQueue).toHaveLength(0)
    })

    it('times each toast independently', () => {
        const { show, toastQueue } = useToast()
        show('short', 'info', 1000)
        show('long', 'info', 3000)

        vi.advanceTimersByTime(1000)
        expect(toastQueue.map(t => t.message)).toEqual(['long'])
    })

    it('dismiss removes the toast and cancels its timer', () => {
        const { show, dismiss, toastQueue } = useToast()
        show('a')
        expect(vi.getTimerCount()).toBe(1)

        dismiss('id-1')

        expect(toastQueue).toHaveLength(0)
        expect(vi.getTimerCount()).toBe(0)
    })

    it('dismiss ignores unknown ids', () => {
        const { show, dismiss, toastQueue } = useToast()
        show('a')
        dismiss('nope')
        expect(toastQueue).toHaveLength(1)
    })

    it('shares one queue between callers', () => {
        useToast().show('x')
        expect(useToast().toastQueue).toHaveLength(1)
    })
})