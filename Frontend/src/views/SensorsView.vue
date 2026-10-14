<template>
    <div id="view">
        <SensorTable />
        <div id="sensor">
            <div id="top">
                <div id="icon">
                    <Icon icon="radio" color="var(--grey-600)" size="85%"/>
                </div>
                <input type="text" ref="name">
                <input type="text" ref="location">
            </div>
            <div id="bottom">
                <div class="actions">
                    <button class="secondary">View</button>
                    <button class="primary">Save</button>
                    <button class="danger">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SensorTable from '@/components/sensors/SensorTable.vue';

import Icon from '@/components/Icon.vue';

export default {
    name: "SensorsView",
    components: {SensorTable, Icon},
    data() {
        return {
        }
    },
}
</script>

<style scoped>
#view {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 15px;
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
}

#top {
    width: 100%;
    height: fit-content;
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
</style>