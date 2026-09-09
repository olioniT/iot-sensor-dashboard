<template>
    <div id="view">
        <div id="overview">
            <DashboardCard icon="thermometer" title="Total Sensors" subtitle="All total sensors" data="24" />
            <DashboardCard icon="activity" title="Active Sensors" subtitle="Actively streaming sensors" data="19" />
            <DashboardCard icon="map-pin" title="Total Locations" subtitle="Total number of locations" data="4" />
        </div>
        <div id="body">
            <Table />
        </div>
    </div>
</template>

<script>
import DashboardCard from '../components/DashboardCard.vue';
import Table from '../components/Table.vue';

export default {
    name: "SensorsView",
    components: {DashboardCard, Table},
    data() {
        return {

        }
    }
}
</script>

<style scoped>
#view {
    width: calc(100vw - var(--menu-width));
    height: calc(100vh - 30px);
    display: grid;
    grid-template-rows: 1.5fr 8.5fr;
    gap: 15px;
    padding: 15px 0px;
}

#overview {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    gap: 25px;
}

#body {
    width: 100%;
    height: 100%;
    overflow-y: clip;
    /* overflow-y: scroll; */
}
</style>