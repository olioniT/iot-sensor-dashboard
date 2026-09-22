<template>
    <div id="view">
        <Table />
    </div>
</template>

<script>
import Table from '../components/sensors/Table.vue';

export default {
    name: "SensorsView",
    components: {Table},
    data() {
        return {

        }
    }
}
</script>

<style scoped>
#view {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 2fr 8fr;
    gap: 15px;
}
</style>