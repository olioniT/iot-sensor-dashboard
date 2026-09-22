<template>
    <div id="view">
        <div id="top">
            <DashboardCard data="21" color="blue" icon="thermometer" title="Avg Temperature" subtitle="Average of all sensors"/>
            <DashboardCard data="19" color="emerald" icon="radio-tower" title="Total Sensors" subtitle="11 online"/>
            <DashboardCard data="8" color="orange" icon="map-pin" title="Locations" subtitle="Across all locations"/>
        </div>
        <div id="bottom">
            <div class="chart">
            </div>
            <div class="chart">
            </div>
        </div>
    </div>
</template>

<script>
import DashboardCard from "../components/DashboardCard.vue"

import { useConfigStore } from "../stores/config.js"

export default {
    name: "DashboardView",
    components: { DashboardCard },

}
</script>

<style scoped>
#view {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    /* background-color: orange; */
}

#top, #bottom {
    width: 100%;
    gap: 10px;
    display: flex;
    /* background-color: yellow; */
}

#top { 
    height: fit-content;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
}

#bottom {
    height: 100%;
    display: grid;
    gap: 15px;
    grid-template-columns: 1.75fr 1.25fr;
    grid-template-rows: 1fr;
}

.chart {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    /* background-color: gold; */
    border: 2.5px solid var(--grey-200);
}
</style>