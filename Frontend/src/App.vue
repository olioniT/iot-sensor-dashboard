<template id="app">
    <Toaster/>
    <Dialogs />
    <component :is="currentLayout">
        <RouterView />
    </component>
</template>

<script>
import Icon from '@/components/Icon.vue';

import Toaster from '@/components/Toaster.vue';

import { useWebSocket } from '@/composables/useWebSocket.js';
import { useDialogs } from '@/composables/useDialogs.js';

import Dialogs from '@/components/dialogs/Dialogs.vue';

export default {
    name: "App",
    components: {Toaster, Icon, Dialogs},
    data() {
        return {
            dialogs: useDialogs()
        }
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
    background-color: var(--grey-800);
}
</style>