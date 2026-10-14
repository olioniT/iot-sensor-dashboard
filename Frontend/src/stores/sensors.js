import { reactive } from "vue";
import { defineStore } from "pinia";

export const useSensorStore = defineStore("sensors", {
    state: () => ({
        sensors: [],
        historicalReadings: [],
        activeReadings: []
    }),
    getters: {
        getAllSensors() {
            return this.sensors
        },
        numOfSensorsByStatus() {
            let sensorStatuses = {}
            this.sensors.forEach((sensor) => {
                if (isNaN(sensorStatuses[sensor.status])) {
                    sensorStatuses[sensor.status] = 1
                } else {
                    sensorStatuses[sensor.status]++
                }
            })
            return sensorStatuses
        },
        getReadings() {
            return this.historicalReadings
        },
        getCurrentReadings() {
            let min = this.historicalReadings.length - this.numOfActiveSensors
            let max = this.historicalReadings.length

            if (this.activeReadings.length === 0) {
                return this.historicalReadings.slice(min, max)
            } else {
                return this.activeReadings
            }
        },
        numOfSensors() {
            return this.sensors.length
        },
        numOfActiveSensors() {
            let activeSensors = 0
            this.sensors.forEach((sensor) => {
                if (sensor.status === "active") {
                    activeSensors++
                }
            })
            return activeSensors
        },
        numOfInactiveSensors() {
            let inactiveSensors = 0
            this.sensors.forEach((sensor) => {
                if (sensor.status === "inactive") {
                    inactiveSensors++
                }
            })
            return inactiveSensors
        },
        numOfLocations() {
            let locations = 0
            let locationArr = []
            this.sensors.forEach((sensor) => {
                if (!locationArr.includes(sensor.location)) {
                    locationArr.push(sensor.location)
                    locations++;
                }
            })
            return locations
        },
        allLocationNames() {
            let locationArr = []
            this.sensors.forEach((sensor) => {
                if (!locationArr.includes(sensor.location)) {
                    locationArr.push(sensor.location)
                }
            })
            return locationArr
        },
        getAllStatuses() {
            let statuses = []

            this.sensors.forEach((sensor) => {
                let formattedStatus = `${sensor.status[0].toUpperCase()}${sensor.status.slice(1, sensor.status.length)}`
                if (!statuses.includes(formattedStatus)) {
                    statuses.push(formattedStatus)
                }
            })

            return statuses
        }
    },
    actions: {
        async fetchAllSensors() {
            try {
                const response = await fetch("http://localhost:3000/api/sensors", {
                    method: "GET",
                    headers: {"Content-Type": "application/json"}
                })

                if (!response.ok) {
                    throw new Error("Unable to retrieve sensors!")
                }

                const data = await response.json()
                
                this.sensors = data
            } catch (err) {
                console.error(err)
            }
        },
        async fetchAllReadings() {
            try {
                const response = await fetch("http://localhost:3000/api/sensors/all/readings", {
                    method: "GET",
                    headers: {"Content-Type": "application/json"}
                })

                if (!response.ok) {
                    throw new Error("Unable to retrieve ALL sensor readings!")
                }

                const data = await response.json()
                
                this.historicalReadings = data
            } catch (err) {
                console.error(err)
            }
        },
        async fetchReadingsFromSensor(sensorID) {
            try {
                const response = await fetch(`http://localhost:3000/api/sensor/${sensorID}/readings`, {
                    method: "GET",
                    headers: {"Content-Type": "application/json"}
                })

                if (!response.ok) {
                    throw new Error(`Unable to retrieve SENSOR-${sensorID} history!`)
                }

                const data = await response.json()

                this.historicalReadings = data
            } catch (err) {
                console.error(err)
            }
        },
        setActiveReadings(readings) {
            this.activeReadings = readings
        },
        addToHistoricalReadings(readings) {
            readings.forEach(reading => {
                this.historicalReadings.push(reading)
            })
        },
        getAverageOfActiveSensors() {
            let temps = []

            if (this.activeReadings.length === 0) {
                let min = this.historicalReadings.length - this.numOfActiveSensors
                let max = this.historicalReadings.length

                let readings = this.historicalReadings.slice(min, max)
                readings.forEach((r) => {
                    temps.push(Number(r.reading))
                })
            } else {
                this.activeReadings.forEach((r) => {
                    temps.push(r.reading)
                })
            }

            return temps.reduce((sum, current) => sum + current, 0) / temps.length
        },
        getSensorByID(id) {
            return this.sensors.find(s => s.id === Number(id))
        },
        getReadingsBySensorID(id) {
            return this.historicalReadings.filter((r) => r.sensor_id === id)
        }
    }
})