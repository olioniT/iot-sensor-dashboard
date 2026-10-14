<template>
    <div id="view">
        <div id="left">
            <div id="filters">
                <input type="text" id="search" placeholder="Search by name">
                <DropDown placeholder="All" @filterByLocation="(location) => filterByLocation(location)" :options="this.locations" />
            </div>
            <div id="list">
                <div v-for="sensor in tempSensors" :class="sensor.id === Number(this.id) ? 'card active' : 'card'" @click="() => {this.$router.push(`/history/sensor/${sensor.id}`)}">
                    <p class="title">{{ sensor.name }}</p>
                    <p class="subtitle">{{ sensor.location }}</p>
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
            
            tempSensors: [],

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
    methods: {
        filterByLocation(location) {
            console.log(location)

            if (location !== "All") {
                this.tempSensors = this.sensors.filter(s => s.location === location)
            } else {
                this.tempSensors = this.sensors
            }
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
            return ["All", ...this.sensorStore.allLocationNames];
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
    },
    mounted() {
        this.tempSensors = this.sensors
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

#left, #right {
    width: calc(100% - 20px);
    height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 0px 10px;
    background-color: var(--grey-750);
}

#right {
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    padding: 20px;
}

#filters {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    padding: 15px 0px;
}

#search { width: calc(100% - 20px); }

#list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.card {
    width: calc(100% - 20px);
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 2.5px;
    padding: 0px 10px;
    cursor: pointer;
}

.card:hover { background-color: var(--grey-800); }
.card.active { background-color: var(--grey-700); }

.card > .title {
    font-size: 18px;
}

.card > .subtitle {
    font-size: 14px;
    color: var(--grey-400)
}

.chart-container {
    position: relative;
    flex: 1;
    min-width: 0;
    min-height: 0;
}
</style>