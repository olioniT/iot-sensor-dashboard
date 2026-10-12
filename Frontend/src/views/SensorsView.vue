<template>
    <div id="view">
        <Table :tableConfig="tableConfig"/>
    </div>
</template>

<script>
import { useSensorStore } from '@/stores/sensors.js';

import Table from '@/components/sensors/Table.vue';

export default {
    name: "SensorsView",
    components: {Table},
    data() {
        return {
            tableConfig: {
                data: [],
                rowConfig: {
                    keys: ["id", "name", "location", "status"],
                    rowCallback: (id) => { this.$router.push(`/history/sensor/${id}`) }
                },
                searchPlaceholder: "Search by name or ID",
                emptyPlaceholder: "No sensors found. Please contact your admin to create one.",
            }
        }
    },
    mounted() {
        this.tableConfig.data = useSensorStore().getAllSensors
    }
}
</script>

<style scoped>
#view {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 15px;
}
</style>