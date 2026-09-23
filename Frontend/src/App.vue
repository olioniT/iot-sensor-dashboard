<template>
    <Toast v-if="toast"/>
    <component :is="currentLayout">
        <RouterView />
    </component>
</template>

<script>
import { useSensorStore } from './stores/sensors.js';

import Toast from './components/Toast.vue';

export default {
    name: "App",
    components: {Toast},
    data() {
        return {
            toast: false
        }
    },
    methods: {
        showToast() {
            this.toast = true
        }
    },
    computed: {
        currentLayout() {
            return this.$router.currentRoute.value.meta.layout
        }
    },
    async mounted() {
        try {
            const response = await fetch("http://localhost:3000/api/sensors", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            if (!response.ok) {
                throw new Error("Unable to retrieve sensors!")
            }

            const data = await response.json()
            
            useSensorStore().storeAllSensors(data)
        } catch (err) {
            console.error(err)
        }
    }
}
</script>

<style scoped>
</style>