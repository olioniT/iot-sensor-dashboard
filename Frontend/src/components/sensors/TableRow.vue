<template>
    <div id="row" @click="() => showHistoryOfSensor(sensor.id)">
        <p>{{ sensor.id }}</p>
        <p>{{ sensor.name }}</p>
        <!-- <p>{{ sensorStore.getCurrentReadings.filter(r => r.sensor_id === sensor.id)}}</p> -->
        <p>{{ reading }}</p>
        <p>{{ sensor.location }}</p>
        <div :class="'status ' + sensor.status">
            <p>{{ sensor.status.toUpperCase() }}</p>
        </div>
        <p>{{ sensor.created_at }}</p>
    </div>
</template>

<script>
import { useSensorStore } from '@/stores/sensors';
import { useConfigStore } from '@/stores/config';

export default {
    name: "TableRow",
    props: ["sensor"],
    components: {},
    data() {
        return {
            sensorStore: useSensorStore(),
            configStore: useConfigStore()
        }
    },
    methods: {
        showHistoryOfSensor(id) {
            this.$router.push(`/history/sensor/${id}`)
        }
    },
    computed: {
        reading() {
            const temp = this.sensorStore.getCurrentReadings.find(r => r.sensor_id === this.sensor.id)

            return temp ? this.configStore.formatTemp(temp.reading) : this.configStore.formatTemp(0)
        }
    }
}
</script>

<style scoped>
#row {
    width: calc(100% - 30px);
    height: 40px;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(6, 1fr);
    justify-content: center;
    align-items: center;
    font-size: 18px;
    background-color: inherit;
    border-bottom: 2px solid rgb(231, 231, 231);
    padding: 0px 15px;
    cursor: pointer;
}

#row:hover {
    background-color: var(--grey-50);
}

.status {
    width: fit-content;
    font-size: 14px;
    padding: 5px 15px;
    border-radius: 15px;
}

.status.active { background-color: var(--green-200); color: var(--green-600); }
.status.inactive { background-color: var(--red-200); color: var(--red-600); }
</style>