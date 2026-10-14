<template>
    <div id="table">
        <div id="header">
            <input type="text" id="search" placeholder="Search for a name or ID">
            <div id="cols">
            </div>
        </div>
        <div id="body">
            <SensorTableRow v-if="sensors.length > 0" v-for="sensor in sensors" :sensor="sensor" @showDataOfSensor="showDataOfSensor"/>
            <p id="no-sensors" v-else>No sensors found. Please contact your administrator to create one.</p>
        </div>
    </div>
</template>

<script>
import SensorTableRow from './SensorTableRow.vue';

export default {
    name: "Table",
    props: ["sensors"],
    components: {SensorTableRow},
    data() {
        return { }
    },
    methods: {
        showDataOfSensor(id) {
            this.$emit("showDataOfSensor", id)
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