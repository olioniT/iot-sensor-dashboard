import { describe, it, expect, afterEach, vi, beforeEach } from "vitest"
import { setActivePinia, createPinia } from "pinia"
import { useSensorStore } from "@/stores/sensors"
import { jsonResponse } from "@/tests/helpers"

const s = (over = {}) => ({ id: 1, name: "Sensor 1", status: "active", location: "Hall", ...over })
const r = (sensor_id, reading) => ({ sensor_id, reading, recorded_at: new Date().toISOString() })

let store

beforeEach(() => {
    setActivePinia(createPinia())
    store = useSensorStore()
    fetch.mockReset()
    vi.spyOn(console, "error").mockImplementation(() => {})
    vi.spyOn(console, "log").mockImplementation(() => {})
})

afterEach(() => vi.restoreAllMocks())   

describe("getters", () => {
    beforeEach(() => {
        store.sensors = [
            s({ id: 1, status: "active", location: "Hall"}),
            s({ id: 2, status: "inactive", location: "Kitchen"}),
            s({ id: 3, status: "active", location: "Hall"})
        ]
    })

    it("counts sensors by status", () => {
        expect(store.numOfSensorsByStatus).toEqual({ active: 2, inactive: 1 })
        expect(store.numOfSensors).toBe(3)
        expect(store.numOfActiveSensors).toBe(2)
        expect(store.numOfInactiveSensors).toBe(1)
    })

    it("lists unique locations", () => {
        expect(store.allLocationNames).toEqual(["Hall", "Kitchen"])
        expect(store.numOfLocations).toBe(2)
    })

    it("exposes all status options", () => {
        expect(store.getAllStatuses).toEqual(["Inactive", "Active"])
    })

    it("getCurrentReadings falls back to the last X historical readings (where X = current active sensors)", () => {
        store.historicalReadings = [r(1, 10), r(3, 11), r(1, 12), r(3, 13)]
        expect(store.getCurrentReadings).toEqual([r(1, 12), r(3, 13)])
    })

    it("getCurrentReadings gets live readings if available", () => {
        let activeReading = r(1, 22)

        store.historicalReadings = [r(1, 10)]
        store.setActiveReadings([activeReading])
        expect(store.getCurrentReadings).toEqual([activeReading])
    })
})

describe("getAverageOfActiveSensors", () => {
    beforeEach(() => {
        store.sensors = [s({ id: 1 }), s({ id: 2 })]
    })

    it("averages the latest historical readings", () => {
        store.historicalReadings = [r(1, "10"), r(2, "20"), r(1, "30"), r(2, "40")]
        expect(store.getAverageOfActiveSensors()).toBe(35)
    })

    it("uses live readings when set", () => {
        store.setActiveReadings([r(1, 20), r(2, 22)])
        expect(store.getAverageOfActiveSensors()).toBe(21)
    })

    it("returns 0 when there are no readings", () => {
        expect(store.getAverageOfActiveSensors()).toBe(0)
    })
})

describe.each([
    ['fetchAllSensors', [], 'http://localhost:3000/api/sensors', 'sensors'],
    ['fetchAllReadings', [], 'http://localhost:3000/api/sensors/all/readings', 'historicalReadings'],
    ['fetchReadingsFromSensor', [7], 'http://localhost:3000/api/sensor/7/readings', 'historicalReadings'],
])('%s', (action, args, url, stateKey) => {
    it('requests the right URL and stores the response', async () => {
        const payload = [{ id: 1 }]
        fetch.mockReturnValueOnce(jsonResponse(payload))

        await store[action](...args)

        expect(fetch).toHaveBeenCalledWith(url, expect.objectContaining({ method: 'GET' }))
        expect(store[stateKey]).toEqual(payload)
    })
 
    it('keeps existing state and logs when the response is not ok', async () => {
        store[stateKey] = [{ id: 99 }]
        fetch.mockReturnValueOnce(jsonResponse({}, false))

        await store[action](...args)

        expect(store[stateKey]).toEqual([{ id: 99 }])
        expect(console.error).toHaveBeenCalled()
    })
 
    it('does not throw on a network error', async () => {
        fetch.mockRejectedValueOnce(new Error('offline'))
        await expect(store[action](...args)).resolves.toBeUndefined()
    })
})

describe("mutations", () => {
    it("setActiveReadings replaces live readings", () => {
        let r1 = r(1, 1)
        let r2 = r(1, 2)
        
        store.setActiveReadings([r1])
        store.setActiveReadings([r2])
        expect(store.activeReadings).toEqual([r2])
    })

    it("addToHistoricalReadings appends", () => {
        store.historicalReadings = [r(1, 1)]
        store.addToHistoricalReadings([r(1, 2), r(2, 3)])
        expect(store.historicalReadings).toHaveLength(3)
    })

    it('createSensor appends', () => {
        store.createSensor(s({ id: 5 }))
        expect(store.sensors.map(x => x.id)).toEqual([5])
    })

    it('updateSensor merges into an existing sensor', () => {
        store.sensors = [s({ id: 1, status: 'active' })]
        store.updateSensor({ id: 1, name: 'Renamed' })
        expect(store.sensors).toEqual([s({ id: 1, name: 'Renamed', status: 'active' })])
    })

    it('updateSensor adds the sensor when it is not in the list', () => {
        store.updateSensor(s({ id: 9 }))
        expect(store.sensors.map(x => x.id)).toEqual([9])
    })

    it('removeSensor removes by id', () => {
        store.sensors = [s({ id: 1 }), s({ id: 2 })]
        store.removeSensor(1)
        expect(store.sensors.map(x => x.id)).toEqual([2])
    })
})