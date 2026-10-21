<template>
    <div id="view" :style="{gridTemplateColumns: this.userStore.isUserAdmin() ? '2fr 1fr' : '1fr'}">
        <span id="table">
            <SensorTable :sensors @showDataOfSensor="showDataOfSensor"/>
            <button class="secondary" v-if="this.userStore.isUserAdmin()" @click="() => dialogs.showSensorDialog()">Create</button>
        </span>
        <div id="sensor" v-if="this.userStore.isUserAdmin()">
            <div id="top">
                <div id="icon" :style="{backgroundColor: tinycolor(this.$refs.color?.value).darken().toString() || 'var(--grey-700)'}">
                    <Icon icon="radio" :color="this.$refs.color?.value || 'var(--grey-650)'" size="85%"/>
                </div>
                <div id="info">
                    <span>
                        <p class="label">Name</p>
                        <input type="text" ref="name" placeholder="Sensor #1" :value="this.sensor.name">
                    </span>
                    <span>
                        <p class="label">Location</p>
                        <input type="text" ref="location" placeholder="Front Door" :value="this.sensor.location">
                    </span>
                </div>
            </div>
            <div id="mid">
                <span style="display: grid; grid-template-columns: 1fr 2fr; gap: 10px;">
                    <span>
                        <p class="label">Status</p>
                        <DropDown :key="sensor.id" @userPicked="(status) => sensorStatus = status" placeholder="Active" :value="getSensorStatus(this.sensor)" :options="this.statuses"/>
                    </span>
                    <span>
                        <p class="label">Color</p>
                        <input type="text" ref="color" placeholder="#A8D5E2" :value="this.sensor.color">
                    </span>
                </span>
                <span style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <span>
                            <p class="label">Max</p>
                            <input type="number" ref="max_temperature" :placeholder="configStore.formatTemp(30)" :value="this.sensor.max_temperature">
                        </span>
                        <span>
                            <p class="label">Min</p>
                            <input type="number" ref="min_temperature" :placeholder="configStore.formatTemp(10)" :value="this.sensor.min_temperature">
                        </span>
                    </span>
                <span>
                    <p class="label">Update Interval</p>
                    <input type="text" ref="update_interval" :value="this.sensor.update_interval" placeholder="30s">
                </span>
            </div>
            <div id="bottom">
                <div class="actions">
                    <button class="danger" @click="() => deleteSensor()">Delete</button>
                    <button class="primary" @click="() => updateSensor()">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useSensorStore } from '@/stores/sensors.js';
import { useUserStore } from '@/stores/user';
import { useConfigStore } from '@/stores/config';

import SensorTable from '@/components/sensors/SensorTable.vue';
import Icon from '@/components/Icon.vue';
import DropDown from '@/components/DropDown.vue';
import SensorDialog from '@/components/sensors/SensorDialog.vue';

import { useToast } from '@/composables/useToast';
import { useDialogs } from '@/composables/useDialogs';

import {tinycolor} from "tinycolor2"

export default {
    name: "SensorsView",
    components: {SensorTable, Icon, DropDown, SensorDialog},
    data() {
        return {
            sensorStore: useSensorStore(),
            userStore: useUserStore(),
            configStore: useConfigStore(),
            
            sensor: {},
            sensorStatus: '',

            dialogs: useDialogs()
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
            this.sensor = this.sensors.find(sensor => sensor.id === id)
            this.sensorStatus = this.sensor.status.toLowerCase()
        },
        getSensorStatus(sensor) {
            if (!sensor.status) {
                return
            } else {
                return sensor.status.toUpperCase()[0] + sensor.status.slice(1, sensor.status.length)
            }
        },
        emptyForm() {
            this.sensor = {}
            this.$refs.name.value = ""
            this.sensorStatus = ""
            this.$refs.color.value = ""
            this.$refs.location.value = ""
            this.$refs.min_temperature.value = ""
            this.$refs.max_temperature.value = ""
            this.$refs.update_interval.value = ""
        },
        async updateSensor() {
            try {
                let updatedSensor = {
                    id: this.sensor.id,
                    name: this.$refs.name.value,
                    status: this.sensorStatus.toLowerCase(),
                    color: this.$refs.color.value,
                    location: this.$refs.location.value,
                    minTemp: Number(this.$refs.min_temperature.value),
                    maxTemp: Number(this.$refs.max_temperature.value),
                    updateInterval: Number(this.$refs.update_interval.value)
                }

                const response = await fetch(`http://localhost:3000/api/sensor/${this.sensor.id}/edit`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(updatedSensor)
                })

                if (!response.ok) {
                    throw new Error("Missing or invalid information.")
                }

                const data = await response.json()
                
                if (data.ok) {
                    this.sensorStore.updateSensor(data.sensor)

                    useToast().show(`Successfully updated sensor #${this.sensor.id}!`, "success")

                    this.emptyForm()
                }
            } catch (err) {
                console.error(err)
                throw new Error(err.message)
            }
        },
        async deleteSensor() {
            try {
                const response = await fetch(`http://localhost:3000/api/sensor/${this.sensor.id}/delete`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({id: this.sensor.id})
                })

                if (!response.ok) {
                    throw new Error("Missing or invalid ID.")
                }

                const data = await response.json()

                if (data.ok) {
                    this.sensorStore.removeSensor(this.sensor.id)

                    useToast().show(`Successfully deleted sensor #${this.sensor.id}`, "success")

                    this.emptyForm()
                }
            } catch (err) {
                console.error(err)
                throw new Error(err.message)
            } 
        }
    }
}
</script>

<style scoped>
#view {
    width: 100%;
    height: 100%;
    display: grid;
    gap: 15px;
}

span#table {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
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

span#table > button {
    width: fit-content;
    align-self: flex-end;
    padding: 10px 15px;
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
}

#bottom > .actions > button {
    padding: 10px 20px;
}
</style>