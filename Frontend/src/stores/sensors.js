import { defineStore } from "pinia";

export const useSensorStore = defineStore("config", {
    state: () => {
        return {
            sensors: []
        }
    },
    getters: {
        getAllSensors() {
            return this.sensors
        }
    },
    actions: {
        storeAllSensors(sensors) {
            this.sensors = sensors
        }
    }
})