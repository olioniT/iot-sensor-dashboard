<template>
    <div id="table">
        <div id="header">
            <input type="text" id="search" :placeholder="this.tableConfig.searchPlaceholder">
        </div>
        <div id="body">
            <TableRow v-if="this.tableConfig.data.length > 0" v-for="row in this.tableConfig.data" :data="row" :rowConfig="this.tableConfig.rowConfig" />
            <p id="no-sensors" v-else>{{ this.tableConfig.emptyPlaceholder }}</p>
        </div>
    </div>
</template>

<script>
import TableRow from './TableRow.vue';

export default {
    name: "Table",
    props: ["tableConfig"],
    components: {TableRow}
}
</script>

<style scoped>
#table {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 0.75fr 9.25fr;
    grid-template-columns: 1fr;
}

#header {
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: var(--grey-750);
    padding: 15px;
}

#body {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
}

#no-sensors {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: var(--grey-400)
}
</style>