<template>
    <div id="overlay">
        <div id="dialog">
            <h1 id="title">Create a new sensor</h1>
            <div id="form">
                <span>
                    <p>Name</p>
                    <input type="text" ref="name" placeholder="Sensor #1">
                </span>
                <span>
                    <p>Location</p>
                    <input type="text" ref="location" placeholder="Garage">
                </span>
                <span style="display: grid; grid-template-columns: 1fr 2fr; gap: 10px;">
                    <span>
                        <p>Status</p>
                        <DropDown @userPicked="(setStatus) => status = setStatus" placeholder="Active" :options="this.sensorStore.getAllStatuses"/>
                    </span>
                    <span>
                        <p>Color</p>
                        <input type="text" ref="color" placeholder="#b74994">
                    </span>
                </span>
                <span style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <span>
                        <p>Max</p>
                        <input type="text" ref="maxTemp" :placeholder="configStore.formatTemp(30)">
                    </span>
                    <span>
                        <p>Min</p>
                        <input type="text" ref="minTemp" :placeholder="configStore.formatTemp(15)">
                    </span>
                </span>
                <span>
                    <p>Update Interval</p>
                    <input type="text" ref="updateInterval" placeholder="30s">
                </span>
            </div>
            <div id="actions">
                <button class="secondary" @click="dialogs.dismissDialog()">Cancel</button>
                <button class="primary" @click="createSensor">Create</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useDialogs } from '@/composables/useDialogs';
import { useToast } from '@/composables/useToast.js';

import DropDown from '../DropDown.vue';

import { useSensorStore } from '@/stores/sensors.js';
import { useConfigStore } from '@/stores/config.js';
import { useUserStore } from '@/stores/user.js';

export default {
    name: "SensorDialog",
    props: [],
    components: {DropDown},
    data() {
        return {
            sensorStore: useSensorStore(),
            configStore: useConfigStore(),
            userStore: useUserStore(),
            
            dialogs: useDialogs(),

            status: ""
        }
    },
    methods: {
        async createSensor() {
            try {
                let sensor = {
                    name: this.$refs.name.value,
                    location: this.$refs.location.value,
                    status: this.status.toLowerCase(),
                    minTemp: this.$refs.minTemp.value,
                    maxTemp: this.$refs.maxTemp.value,
                    updateInterval: Number(this.$refs.updateInterval.value),
                    createdBy: this.userStore.getCurrentUser.id
                }
                
                const response = await fetch("http://localhost:3000/api/sensor/create", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(sensor)
                })

                if (!response.ok) {
                    throw new Error("Missing or invalid information.")
                }

                const data = await response.json()

                if (data.ok) {
                    this.sensorStore.createSensor(data.sensor)
                    
                    useToast().show(`Successfully created sensor #${data.sensor.id}`, "success")
                    
                    this.dialogs.dismissDialog()
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
#overlay {
    width: 100vw;
    height: 100vh;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);
}

#dialog {
    width: 400px;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 2.5px;
    background-color: var(--grey-750);
    padding: 20px;
}

#title {
    width: 100%;
    height: fit-content;
    padding: 10px 0px;
    text-align: center;
}

#form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
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

#actions {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
</style>