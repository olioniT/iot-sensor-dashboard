<template>
    <!-- <div id="row" @click="() => showHistoryOfSensor(sensor.id)"> -->
    <div class="row">
        <p v-for="col in rowConfig.keys" :class="col">{{ data[col] }}</p>
    </div>
</template>

<script>
export default {
    name: "TableRow",
    props: ["data", "rowConfig"],
    components: {},
    data() {
        return {}
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
.row {
    width: calc(100% - 30px);
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    background-color: inherit;
    border-bottom: 2px solid var(--grey-650);
    padding: 0px 15px;
    cursor: pointer;
}

.row:hover { background-color: var(--grey-750); }

.status {
    width: fit-content;
    font-size: 14px;
    padding: 5px 15px;
    border-radius: 15px;
}

.status.active { background-color: var(--green-450); }
.status.active > p { color: var(--green-900); }
.status.inactive { background-color: var(--red-450); }
.status.inactive > p { color: var(--red-900); }
</style>