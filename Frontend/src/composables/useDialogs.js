import { reactive } from 'vue';

const state = reactive({
    sensorDialog: false,
    userDialog: false
})

export function useDialogs() {
    const showSensorDialog = () => {
        state.sensorDialog = true
    }
    
    const showUserDialog = () => {
        state.userDialog = true
    }

    const dismissDialog = () => {
        state.sensorDialog = false
        state.userDialog = false
    }

    return {
        state,
        showSensorDialog,
        showUserDialog,
        dismissDialog
    }
}