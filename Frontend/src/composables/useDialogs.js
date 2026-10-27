import { reactive } from 'vue';

const state = reactive({
    sensorDialog: false,

    userDialog: false,
    userDialogTitle: "",
    userDialogID: "",
    userDialogCallback: "",
    
    deleteDialog: false,
    deleteDialogTitle: "",
    deleteDialogMsg: "",
    deleteDialogCallback: "",
})

export function useDialogs() {
    const showSensorDialog = () => {
        state.sensorDialog = true
    }
    
    const showUserDialog = (id, title, confirmCallback) => {
        state.userDialog = true
        state.userDialogTitle = title
        state.userDialogID = id
        state.userDialogCallback = confirmCallback
    }
    
    const showDeleteDialog = (title, msg, confirmCallback) => {
        state.deleteDialog = true
        state.deleteDialogTitle = title
        state.deleteDialogMsg = msg
        state.deleteDialogCallback = confirmCallback
    }
    
    const dismissDialog = () => {
        state.sensorDialog = false
        state.userDialog = false
        state.deleteDialog = false
        
        state.deleteDialogTitle = ""
        state.deleteDialogMsg = ""
        state.deleteDialogCallback = ""

        state.userDialogTitle = ""
        state.userDialogID = ""
        state.userDialogCallback = ""
    }

    return {
        state,
        showSensorDialog,
        showUserDialog,
        showDeleteDialog,
        dismissDialog
    }
}