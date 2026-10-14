import { defineStore } from "pinia";

export const useConfigStore = defineStore("config", {
    state: () => {
        return {
            tempFormat: "c",
            mode: "light"
        }
    },
    getters: {
    },
    actions: {
        switchTempFormat() {
            if (this.tempFormat === "c") { this.tempFormat = "f" }
            else if (this.tempFormat === "f") { this.tempFormat = "c" }
        },
        formatTemp(temp) {
            if (this.tempFormat === "c") {
                return `${temp}\u00B0C`
                // return '&deg;C'
            } else if (this.tempFormat === "f") {
                return `${(temp * (9 / 5)) + 32}\u00B0F`
            }
        }
    }
})