<template>
    <div class="row" @click="() => showHistoryOfSensor(sensor.id)">
        <p>{{ sensor.id }}</p>
        <div class="info">
            <p>{{ sensor.name }}</p>
            <p>{{ sensor.location }}</p>
        </div>
        <p :class="sensor.status === 'active' ? 'status active' : 'status inactive'">{{ sensor.status.toUpperCase() }}</p>
    </div>
</template>

<script>
export default {
    name: "TableRow",
    props: ["sensor"],
    components: {},
    data() {
        return {}
    },
    mounted() {
        console.log(this.rowConfig)
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
    width: 100%;
    box-sizing: border-box;
    height: 50px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    text-align: left;
    font-size: 18px;
    background-color: inherit;
    border-bottom: 2px solid var(--grey-650);
    padding: 0px 15px;
    cursor: pointer;
}

.row:hover { background-color: var(--grey-850); }

.row > p { margin: 0; }
.row > p:first-child { text-align: left; }

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
</style>