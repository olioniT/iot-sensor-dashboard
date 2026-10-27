<template>
    <SensorDialog v-if="dialogs.state.sensorDialog"/>
    <UserDialog v-if="dialogs.state.userDialog"/>
    <DeleteDialog v-if="dialogs.state.deleteDialog"/>
</template>

<script>
import SensorDialog from '@/components/dialogs/SensorDialog.vue';
import UserDialog from '@/components/dialogs/UserDialog.vue';
import DeleteDialog from '@/components/dialogs/DeleteDialog.vue';

import { useDialogs } from '@/composables/useDialogs';

export default {
    name: "Dialogs",
    components: { SensorDialog, UserDialog, DeleteDialog },
    data() {
        return {
            dialogs: useDialogs()
        }
    }
}
</script>

<style>
</style>