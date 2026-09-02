<template>
    <div id="view">
        <div id="overview">
            <DashboardCard title="Total Sensors" subtitle="All sensors in all locations" data="24" />
            <DashboardCard title="Active Sensors" subtitle="Current actively streaming sensors" data="19" />
            <DashboardCard title="Total Locations" subtitle="Total number of locations" data="4" />
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
    width: 80vw;
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
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    gap: 25px;
}

#body {
    width: 100%;
    height: 100%;
}
</style>