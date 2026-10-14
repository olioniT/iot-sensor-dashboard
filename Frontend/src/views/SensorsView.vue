<template>
    <div id="view">
        <SensorTable />
    </div>
</template>

<script>
import SensorTable from '@/components/sensors/SensorTable.vue';

export default {
    name: "SensorsView",
    components: {SensorTable},
    data() {
        return {
        }
    },
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