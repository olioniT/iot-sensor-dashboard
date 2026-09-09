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
    width: 100vw;
    height: calc(100vh - 30px);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 15px;
    padding: 15px 0px;
}

#overview {
    width: 100%;
    height: 17.5vh;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    gap: 25px;
}

#body {
    width: 100%;
    height: 82.5vh;
    overflow-y: scroll;
}
</style>