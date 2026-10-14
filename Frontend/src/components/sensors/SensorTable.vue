<template>
    <div id="table">
        <div id="header">
            <input type="text" id="search" placeholder="Search for a name or ID">
        </div>
        <div id="body">
            <SensorTableRow v-if="sensors.length > 0" v-for="sensor in sensors" :sensor="sensor" />
            <p id="no-sensors" v-else>No sensors found. Please contact your administrator to create one.</p>
        </div>
    </div>
</template>

<script>
import { useSensorStore } from '@/stores/sensors.js';

import SensorTableRow from './SensorTableRow.vue';

export default {
    name: "Table",
    props: [],
    components: {SensorTableRow},
    data() {
        return {
            sensorStore: useSensorStore()
        }
    },
    computed: {
        sensors() {
            return this.sensorStore.getAllSensors
        }
    }
}
</script>

<style scoped>
#table {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 0.75fr 9.25fr;
    grid-template-columns: 1fr;
}

#header {
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: var(--grey-750);
    padding: 15px;
}

#body {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
}

#no-sensors {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: var(--grey-400)
}
</style>