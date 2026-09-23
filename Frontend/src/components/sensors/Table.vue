<template>
    <div id="table">
        <div id="header">
            <input type="text" id="search" placeholder="Search by ID or name">
            <!-- <p id="title">Temperature Sensors</p> -->
        </div>
        <div id="body">
            <!-- <TableRow id="1" name="Sensor 1" temp="20" location="Main Office" status="active"/> -->
            <!-- <TableRow id="2" name="Sensor 2" temp="20" location="Hallway 1" status="inactive"/> -->
            <TableRow v-if="sensors.length > 0" v-for="sensor in sensors" :sensor="sensor" />
            <p id="no-sensors" v-else>No sensors found, please contact your admin to create one.</p>
        </div>
    </div>
</template>

<script>
import { useSensorStore } from '../../stores/sensors.js';

import TableRow from './TableRow.vue';

export default {
    name: "Table",
    props: [],
    components: {TableRow},
    data() {
        return {
            sensors: []
        }
    },
    created() {
        this.sensors = useSensorStore().getAllSensors
    }
}
</script>

<style scoped>
#table {
    width: 100%;
    height: 82.5vh;
    display: grid;
    grid-template-rows: 0.75fr 9.25fr;
    grid-template-columns: 1fr;
}

#header {
    width: calc(100% - 30px);
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: var(--grey-200);
    padding: 0px 15px;
}

#title {
    font-size: 20px;
    font-weight: 600;
}

#search {
    padding: 5px 10px;
    border-radius: 2.5px;
    font-size: 14px;
    background-color: var(--grey-50);
}

#body {
    width: 100%;
    height: calc(100% - 50px);
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