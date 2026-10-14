<template>
    <div class="row">
        <div class="info">
            <p>{{ sensor.name }}</p>
            <p>{{ sensor.location }}</p>
        </div>
        <p>{{ reading }}</p>
        <p :class="sensor.status === 'active' ? 'status active' : 'status inactive'">{{ sensor.status.toUpperCase() }}</p>
        <p>Last edited {{ this.formatLastEdited(sensor.last_edited) }}</p>
        <div class="actions">
            <button class="secondary" @click="() => showHistoryOfSensor(sensor.id)">
                <Icon icon="view" color="var(--grey-200)" size="18px"/>
                <p>View</p>
            </button>
            <button class="primary" @click="() => showDataOfSensor(sensor.id)">
                <Icon icon="edit" color="var(--blue-200)" size="18px"/>
                <p>Edit</p>
            </button>
        </div>
    </div>
</template>

<script>
import { useSensorStore } from '@/stores/sensors';
import { useConfigStore } from '@/stores/config';

import Icon from '../Icon.vue';

export default {
    name: "TableRow",
    props: ["sensor"],
    components: {Icon},
    data() {
        return {
            sensorStore: useSensorStore(),
            configStore: useConfigStore()
        }
    },
    methods: {
        formatLastEdited(date) {
            return `${date.split("T")[0].split("-").join("/")} ${date.split("T")[1].slice(0, 5)}`
        },
        showHistoryOfSensor(id) {
            this.$router.push(`/history/sensor/${id}`)
        },
        showDataOfSensor(id) {
            this.$emit("showDataOfSensor", id)
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
.row {
    width: 100%;
    box-sizing: border-box;
    height: 50px;
    display: grid;
    grid-template-columns: 1fr 1fr auto 2fr 1fr;
    align-items: center;
    text-align: left;
    font-size: 18px;
    background-color: inherit;
    border-bottom: 2px solid var(--grey-650);
    padding: 0px 15px;
}

/* .row:hover { background-color: var(--grey-850); } */

.row > p { margin: 0; }
.row > p:first-child { text-align: left; }
.row > p:nth-child(2) { width:100%; text-align: center; }
.row > p:nth-child(4) { width:100%; text-align: center; color: var(--grey-400); font-size: 16px; }
.row > p:last-child { text-align: right; color: var(--grey-450) }

.info > p:first-child { font-size: 18px; }
.info > p:last-child { font-size: 14px; color: var(--grey-400) }

.status {
    min-width: 50px;
    width: fit-content;
    justify-self: center;
    font-size: 12px;
    padding: 5px 15px;
    border-radius: 15px;
}

.status.active { background-color: var(--green-450); }
.status.active > p { color: var(--green-900); }
.status.inactive { background-color: var(--red-450); }
.status.inactive > p { color: var(--red-900); }

.actions { display: flex; justify-self: flex-end; gap: 10px; }
.actions > button { width: fit-content; height: 30px; font-size: 14px; }
</style>