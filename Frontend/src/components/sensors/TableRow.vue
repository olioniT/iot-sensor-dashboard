<template>
    <div id="row">
        <p>{{ id }}</p>
        <p>{{ name }}</p>
        <p>{{ this.configStore.formatTemp(temp) }}</p>
        <p>{{ location }}</p>
        <div :class="'status ' + status">
            <p>{{ status.toUpperCase() }}</p>
        </div>
    </div>
</template>

<script>
import { useConfigStore } from '../../stores/config';

export default {
    name: "TableRow",
    props: ["id", "name", "temp", "location", "status"],
    components: {},
    data() {
        return {
            configStore: useConfigStore()
        }
    }
}
</script>

<style scoped>
#row {
    width: calc(100% - 30px);
    height: 40px;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(5, 1fr);
    justify-content: center;
    align-items: center;
    /* display: flex;
    align-items: center;
    justify-content: space-evenly; */
    font-size: 18px;
    background-color: inherit;
    border-bottom: 2px solid rgb(231, 231, 231);
    padding: 0px 15px;
    cursor: pointer;
}

#row:hover {
    background-color: var(--grey-50);
}

.status {
    width: fit-content;
    font-size: 14px;
    padding: 5px 15px;
    border-radius: 15px;
}

.status.active { background-color: var(--green-200); color: var(--green-600); }
.status.inactive { background-color: var(--red-200); color: var(--red-600); }
</style>