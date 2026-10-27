<template>
    <div id="view" :style="{gridTemplateColumns: this.userStore.isUserAdmin() ? '2fr 1fr' : '1fr'}">
        <span id="table">
            <SensorTable :sensors @showDataOfSensor="showDataOfSensor"/>
            <button class="secondary" v-if="this.userStore.isUserAdmin()" @click="() => dialogs.showSensorDialog()">Create</button>
        </span>
        <div id="sensor" v-if="this.userStore.isUserAdmin()">
            <div id="top">
                <div id="icon">
                    <Icon icon="radio" color="var(--grey-650)" size="85%"/>
                </div>
                <div id="info">
                    <span>
                        <p class="label">Name</p>
                        <input type="text" placeholder="Sensor #1" v-model="form.name">
                    </span>
                    <span>
                        <p class="label">Location</p>
                        <input type="text" placeholder="Front Door" v-model="form.location">
                    </span>
                </div>
            </div>
            <div id="mid">
                <span style="display: grid; grid-template-columns: 1fr 2fr; gap: 10px;">
                    <span>
                        <p class="label">Status</p>
                        <DropDown :key="form.id" @userPicked="(status) => form.status = status" placeholder="Active" :value="capitalise(form.status)" :options="this.statuses"/>
                    </span>
                    <span>
                        <p class="label">Color</p>
                        <input type="text" placeholder="#A8D5E2" v-model="form.color">
                    </span>
                </span>
                <span style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <span>
                            <p class="label">Max</p>
                            <input type="number" :placeholder="configStore.formatTemp(30)" v-model="form.max_temperature">
                        </span>
                        <span>
                            <p class="label">Min</p>
                            <input type="number" :placeholder="configStore.formatTemp(10)" v-model="form.min_temperature">
                        </span>
                    </span>
                <span>
                    <p class="label">Update Interval</p>
                    <input type="number" v-model="form.update_interval" placeholder="30s">
                </span>
            </div>
            <div id="bottom">
                <div class="actions">
                    <button :class="isFormEmpty() ? 'danger disabled' : 'danger'" :disabled="isFormEmpty()" @click="() => dialogs.showDeleteDialog('Delete sensor?', `Are you sure you want to delete ${form.name}?`, () => deleteSensor(form.id, form.name))">Delete</button>
                    <button :class="isFormEmpty() ? 'primary disabled' : 'primary'" @click="() => updateSensor()" :disabled="isFormEmpty()">Save</button>
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

import { useToast } from '@/composables/useToast';
import { useDialogs } from '@/composables/useDialogs';

export default {
    name: "SensorsView",
    components: {SensorTable, Icon, DropDown},
    data() {
        return {
            sensorStore: useSensorStore(),
            userStore: useUserStore(),
            configStore: useConfigStore(),

            dialogs: useDialogs(),

            form: {
                id: null,
                name: "",
                status: "",
                color: "",
                location: "",
                min_temperature: "",
                max_temperature: "",
                update_interval: ""
            }
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
        capitalise(string) {
            return string ? string.toUpperCase()[0] + string.slice(1) : undefined
        },
        showDataOfSensor(id) {
            let sensor = this.sensors.find(sensor => sensor.id === id)
            if (sensor) { this.form = {...sensor} }
        },
        emptyForm() {
            this.form = {
                id: null,
                name: "",
                status: "",
                color: "",
                location: "",
                min_temperature: "",
                max_temperature: "",
                update_interval: ""
            }
        },
        isFormEmpty() {
            return Object.values(this.form).some(value => value === "" || value === null || value === undefined)
        },
        async updateSensor() {
            try {
                const payload = {
                    id: this.form.id,
                    name: this.form.name,
                    status: this.form.status.toLowerCase(),
                    color: this.form.color,
                    location: this.form.location,
                    minTemp: Number(this.form.min_temperature),
                    maxTemp: Number(this.form.max_temperature),
                    updateInterval: Number(this.form.update_interval)
                }

                const response = await fetch(`http://localhost:3000/api/sensor/${this.form.id}/edit`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(payload)
                })

                if (!response.ok) {
                    throw new Error("Missing or invalid information.")
                }

                const data = await response.json()
                
                if (data.ok) {
                    this.sensorStore.updateSensor(data.sensor)

                    useToast().show(`Successfully updated sensor #${this.form.id}!`, "success")

                    this.emptyForm()
                }
            } catch (err) {
                console.error(err)
                throw new Error(err.message)
            }
        },
        async deleteSensor(sensorID, sensorName) {
            try {
                const response = await fetch(`http://localhost:3000/api/sensor/${sensorID}/delete`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({id: sensorID})
                })

                if (!response.ok) {
                    throw new Error("Missing or invalid ID.")
                }

                const data = await response.json()

                if (data.ok) {
                    this.sensorStore.removeSensor(sensorID)

                    useToast().show(`Successfully deleted ${sensorName} (ID: ${sensorID})`, "success")

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