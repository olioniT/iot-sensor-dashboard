<template>
    <div id="overlay">
        <div id="dialog">
            <h1>{{ dialogs.state.deleteDialogTitle }}</h1>
            <p>{{ dialogs.state.deleteDialogMsg }}</p>
            <div class="actions">
                <button class="secondary" @click="() => dialogs.dismissDialog()">Cancel</button>
                <button class="danger" @click="() => {dialogs.state.deleteDialogCallback(); dialogs.dismissDialog()}">Yes</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useDialogs } from '@/composables/useDialogs';

export default {
    name: "DeleteDialog",
    props: [],
    data() {
        return {
            dialogs: useDialogs()
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
    width: 350px;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 2.5px;
    background-color: var(--grey-750);
    padding: 20px;
}

p {
    font-size: 16px;
}

.actions {
    width: 100%;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
}
</style>