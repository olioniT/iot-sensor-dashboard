<template>
    <div id="view">
        <div id="top">
            <DashboardCard :data="averageSensorTemp" color="blue" icon="thermometer" title="Avg Temperature" subtitle="Average of all sensors"/>
            <DashboardCard :data="activeSensors" color="emerald" icon="radio-tower" title="Total Sensors" :subtitle="allSensors + ' online'"/>
            <DashboardCard :data="totalLocations" color="pink" icon="map-pin" title="Locations" subtitle="Across all locations"/>
        </div>
        <div id="bottom">
            <div class="chart line-chart">
                <p class="chart-title">Temperature Trend</p>
                <div class="chart-container">
                    <Line ref="lineChart" :data="lineData" :options="lineOptions"/>
                </div>
            </div>
            <div class="chart donut-chart">
                <p class="chart-title">Sensors by Status</p>
                <div class="chart-container">
                    <Doughnut :data="doughnutData" :options="doughnutOptions" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'chartjs-adapter-date-fns';

import { useConfigStore } from '@/stores/config.js';
import { useSensorStore } from '@/stores/sensors.js';

import DashboardCard from "@/components/dashboard/DashboardCard.vue"

import { parseTimestamp } from '@/util';
import { Line, Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TimeScale, LinearScale, LineController, LineElement, PointElement } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend, TimeScale, LinearScale, LineController, LineElement, PointElement)

export default {
    name: "DashboardView",
    components: { DashboardCard, Line, Doughnut },
    data() {
        return {
            sensors: useSensorStore(),
            config: useConfigStore(),
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
                        min: 15,
                        max: 35,
                        ticks: {
                            stepSize: 5
                        }
                    }
                }
            },
            doughnutOptions: {
                responsive: true,
                maintainAspectRatio: false,
                animation: { duration: 0 },
                plugins: {
                    legend: {
                        position: "bottom"
                    }
                }
            }
        }
    },
    async mounted() {
        const store = useSensorStore()

        await store.fetchAllSensors()
        await store.fetchAllReadings()
    },
    computed: {
        averageSensorTemp() {
            return this.config.formatTemp(this.sensors.getAverageOfActiveSensors())
        },
        activeSensors() {
            return this.sensors.numOfActiveSensors
        },
        allSensors() {
            return this.sensors.numOfSensors
        },
        totalLocations() {
            return this.sensors.numOfLocations
        },
        lineData() {
            const cutoffDate = Date.now() - 1 * 60 * 60 * 1000

            return {
                datasets: this.sensors.getAllSensors.map((sensor) => {
                    return {
                        label: sensor.name,
                        data: this.sensors.getReadings
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
                    }
                })
            }
        },
        doughnutData() {
            return {
                labels: Object.keys(this.sensors.numOfSensorsByStatus).map(status => {return `${status.toUpperCase()[0]}${status.slice(1, status.length)}`}),
                datasets: [{
                    label: "Sensors by Status",
                    data: Object.values(this.sensors.numOfSensorsByStatus),
                    backgroundColor: ["rgb(5, 223, 114)", "rgb(255, 100, 103)"],
                    hoverOffset: 4
                }]
            }
        }
    },
}
</script>

<style scoped>
.line-chart, .donut-chart, #card {
    border: 2.5px solid var(--grey-200);
}

#view {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
}

#top, #bottom {
    width: 100%;
    gap: 10px;
    display: flex;
}

#top { 
    height: fit-content;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
}

#bottom {
    width: 100%;
    height: 100%;
    display: grid;
    gap: 15px;
    grid-template-columns: 1.75fr 1.25fr;
    grid-template-rows: 1fr;
}

.chart {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.chart-title {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
}

.chart-container {
    position: relative;
    flex: 1;
    min-width: 0;
    min-height: 0;
}
</style>