<template id="app">
    <Toaster/>
    <component :is="currentLayout">
        <RouterView />
    </component>
</template>

<script>
import Icon from './components/Icon.vue';

import Toaster from '@/components/Toaster.vue';

import { useWebSocket } from './composables/useWebSocket.js';

export default {
    name: "App",
    components: {Toaster, Icon},
    data() {
        return {}
    },
    computed: {
        currentLayout() {
            return this.$router.currentRoute.value.meta.layout
        }
    },
    mounted() {
        const ws = useWebSocket()

        ws.connect()
    }
}
</script>

<style scoped>
#app {
    background-color: var(--white);
}
</style>