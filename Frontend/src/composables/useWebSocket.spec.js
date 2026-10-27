import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { toRaw } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { useSensorStore } from '@/stores/sensors'
import { useWebSocket } from '@/composables/useWebSocket'
 
const { show } = vi.hoisted(() => ({ show: vi.fn() }))
vi.mock('@/composables/useToast', () => ({ useToast: () => ({ show }) }))

class FakeWebSocket {
    static instances = []
    constructor(url) {
        this.url = url
        this.readyState = 0 // CONNECTING
        this.close = vi.fn()
        FakeWebSocket.instances.push(this)
    }
}
 
const message = (payload) => ({ data: JSON.stringify(payload) })
const lastSocket = () => FakeWebSocket.instances.at(-1)
 
beforeEach(() => {
    FakeWebSocket.instances = []
    vi.stubGlobal('WebSocket', FakeWebSocket)
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
    show.mockClear()

    createTestingPinia({ createSpy: vi.fn }) // actions are stubbed spies, which is what we want here
    useWebSocket().socket.value = null // module-level ref: reset between tests
})
 
afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
})
 
describe('useWebSocket', () => {
    it('connects to the backend and exposes the socket', () => {
        const { connect, socket } = useWebSocket()
        connect()

        expect(lastSocket().url).toBe('ws://localhost:3000')
        expect(toRaw(socket.value)).toBe(lastSocket())
    })

    it('sends sensor-readings messages to the sensor store', () => {
        const readings = [{ sensor_id: 1, reading: '20.5', recorded_at: '2026-10-25T12:00:00Z' }]
        useWebSocket().connect()

        lastSocket().onmessage(message({ type: 'sensor-readings', message: readings }))

        const sensors = useSensorStore()
        expect(sensors.setActiveReadings).toHaveBeenCalledWith(readings)
        expect(sensors.addToHistoricalReadings).toHaveBeenCalledWith(readings)
    })

    it('ignores message types it does not know', () => {
        useWebSocket().connect()
        lastSocket().onmessage(message({ type: 'something-else', message: [] }))

        const sensors = useSensorStore()
        expect(sensors.setActiveReadings).not.toHaveBeenCalled()
        expect(sensors.addToHistoricalReadings).not.toHaveBeenCalled()
    })

    it('shows an error toast when the socket errors', () => {
        useWebSocket().connect()
        lastSocket().onerror(new Event('error'))

        expect(show).toHaveBeenCalledWith('Error connecting to WebSocket.', 'error')
    })
})