<template>
    <div id="view">
        <div id="left">
            <div id="filters">
                <input type="text" id="search" placeholder="Search by name">
                <DropDown placeholder="Select a Location..." :options="this.locations" />
            </div>
            <div id="list">
                <div v-for="sensor in sensors" :class="sensor.id === Number(this.id) ? 'card active' : 'card'" @click="() => {this.$router.push(`/history/sensor/${sensor.id}`)}">
                    <p class="name">{{ sensor.name }}</p>
                    <p class="location">{{ sensor.location }}</p>
                </div>
            </div>
        </div>
        <div id="right">
            <div class="chart-container">
                <Line v-if="Number(this.id) !== 0" :data="lineData" :options="lineOptions"/>
            </div>
        </div>
    </div>
</template>

<script>
import { useSensorStore } from '../stores/sensors.js';

import DropDown from "../components/history/DropDown.vue"
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TimeScale, LineController, LineElement, PointElement } from "chart.js"
import { parseTimestamp } from '@/util.js';

ChartJS.register(ArcElement, Tooltip, Legend, TimeScale, LineController, LineElement, PointElement)

export default {
    name: "HistoryView",
    props: ["id"],
    components: {DropDown, Line},
    data() {
        return {
            sensorStore: useSensorStore(),
            lineOptions: {
                responsive: true,
                maintainAspectRatio: false,
                animation: { duration: 0 },
                scales: {
                    x: {
                        type: "time",
                        time: {
                            unit: "hour",
                            tooltipFormat: "HH:mm",
                        }
                    },
                    y: {
                        min: 10,
                        max: 30,
                        ticks: {
                            stepSize: 5
                        }
                    }
                }
            },
        }
    },
    computed: {
        sensorID() {
            return Number(this.id) || 0
        },
        sensors() {
            return this.sensorStore.getAllSensors;
        },
        readings() {
            return this.sensorStore.getReadingsBySensorID(this.sensorID)   
        },
        locations() {
            return this.sensorStore.allLocationNames;
        },
        lineData() {
            const cutoffDate = Date.now() - 4 * 60 * 60 * 1000

            if (this.sensorID !== 0) {
                let sensor = this.sensorStore.getSensorByID(Number(this.sensorID))

                return {
                    datasets: [{
                        label: sensor.name,
                        data: this.sensorStore.getReadings
                        .filter(r => r.sensor_id === sensor.id)
                        .map(r => {
                            return {
                                x: parseTimestamp(r.recorded_at),
                                y: Number(r.reading)
                            }
                        })
                        .filter(p => !isNaN(p.x) && p.x >= cutoffDate)
                        .sort((a, b) => a.x - b.x),
                        borderColor: sensor.color,
                        backgroundColor: sensor.color,
                        tension: 0
                    }]
                }
            } else {
                return []
            }
        },
    }
}
</script>

<style scoped>
#view {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1.5fr 4fr;
    grid-template-rows: 1fr;
    gap: 15px;
}

#left {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 1.4fr 9fr;
    grid-template-columns: 1fr;
    border-radius: 5px;
    border: 2.5px solid var(--grey-750);
}

#filters {
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    border-top-left-radius: 2.5px;
    border-top-right-radius: 2.5px;
    background-color: var(--grey-750);
    padding: 15px;
}

#search {
    width: calc(100% - 10px);
    height: 35px;
    border-radius: 2.5px;
    font-size: 14px;
    padding: 0px 10px;
    background-color: var(--grey-700);
}

.card {
    padding: 10px;
    cursor: pointer;
}

.active { background-color: var(--grey-700); }

.name { font-size: 16px; }

.location {
    font-size: 12px;
    font-style: italic;
    color: var(--grey-400);
}

#right {
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 60px);
    min-width: 0;
    min-height: 100%;
    padding: 30px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 2.5px solid var(--grey-750);
}

.chart-container {
    position: relative;
    flex: 1;
    min-width: 0;
    min-height: 0;
}
</style>