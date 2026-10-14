<template>
    <div id="view">
        <SensorTable :sensors @showDataOfSensor="showDataOfSensor"/>
        <div id="sensor">
            <div id="top">
                <div id="icon">
                    <Icon icon="radio" color="var(--grey-600)" size="85%"/>
                </div>
                <div id="info">
                    <span>
                        <p class="label">Name</p>
                        <input type="text" ref="name" placeholder="Sensor #1">
                    </span>
                    <span>
                        <p class="label">Location</p>
                        <input type="text" ref="location" placeholder="Front Door">
                    </span>
                </div>
            </div>
            <div id="mid">
                <span style="display: grid; grid-template-columns: 1fr 2fr; gap: 10px;">
                    <span>
                        <p class="label">Status</p>
                        <DropDown placeholder="Active" :options="this.statuses"/>
                    </span>
                    <span>
                        <p class="label">Color</p>
                        <input type="text" placeholder="#A8D5E2" ref="sensorColor">
                    </span>
                </span>
            </div>
            <div id="bottom">
                <div class="actions">
                    <button class="danger">Delete</button>
                    <button class="primary">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useSensorStore } from '@/stores/sensors.js';

import SensorTable from '@/components/sensors/SensorTable.vue';
import Icon from '@/components/Icon.vue';
import DropDown from '@/components/DropDown.vue';

export default {
    name: "SensorsView",
    components: {SensorTable, Icon, DropDown},
    data() {
        return {
            sensorStore: useSensorStore()
        }
    },
    computed: {
        sensors() {
            return this.sensorStore.getAllSensors
        },
        statuses() {
            return this.sensorStore.getAllStatuses
        }
    },
    methods: {
        showDataOfSensor(id) {
            let sensor = this.sensors.find(sensor => sensor.id === id)

            this.$refs.name.value = sensor.name
            this.$refs.location.value = sensor.location
        }
    }
}
</script>

<style scoped>
#view {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 15px;
}

#sensor {
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    background-color: var(--grey-750);
    border-radius: 5px;
    padding: 20px;
    gap: 15px;
}

#top {
    width: 100%;
    height: fit-content;
    display: flex;
    gap: 10px;
}

#icon {
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--grey-700);
    aspect-ratio: 1 / 1;
    border-radius: 5px;
}

#top > #info {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    gap: 10px;
}

span {
    width: 100%;
    display: flex;
    gap: 2.5px;
    flex-direction: column;
}

span > p { color: var(--grey-450) }
span > input { width: calc(100% - 20px); padding: 10px; font-size: 16px; }

#mid {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    gap: 10px;
}

#bottom {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

#bottom > .actions {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    background-color: orange;
}
</style>