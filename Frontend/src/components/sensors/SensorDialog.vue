<template>
    <div id="overlay">
        <div id="dialog">
            <div id="form">
                <h1>Create a new sensor.</h1>
                <span>
                    <p>Name</p>
                    <input type="text">
                </span>
                <span>
                    <p>Location</p>
                    <input type="text">
                </span>
                <span style="display: grid; grid-template-columns: 1fr 2fr; gap: 10px;">
                    <span>
                        <p>Status</p>
                        <input type="text">
                    </span>
                    <span>
                        <p>Color</p>
                        <input type="text">
                    </span>
                </span>
                <span style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <span>
                        <p>Max</p>
                        <input type="text">
                    </span>
                    <span>
                        <p>Min</p>
                        <input type="text">
                    </span>
                </span>
                <span>
                    <p>Update Interval</p>
                    <input type="text">
                </span>
            </div>
            <div id="actions">
                <button class="secondary" @click="dialogs.dismissDialog()">Cancel</button>
                <button class="primary">Create</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useDialogs } from '@/composables/useDialogs';

export default {
    name: "SensorDialog",
    props: [],
    components: {},
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
    width: 400px;
    height: 465px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 2.5px;
    background-color: var(--grey-750);
    padding: 20px;
}

#form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
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