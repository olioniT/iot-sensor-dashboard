<template>
    <div id="view">
        <div id="left">
            <div id="history">
                <div id="filters">
                    <input type="text" id="search">
                    <DropDown placeholder="Select a Location..." />
                </div>
                <div id="list"></div>
            </div>
        </div>
        <div id="right">
        </div>
    </div>
</template>

<script>
import DropDown from "../components/history/DropDown.vue"

export default {
    name: "HistoryView",
    components: {DropDown}
}
</script>

<style scoped>
#view {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1.5fr 4fr;
    grid-template-rows: 1fr;
    gap: 10px;
}

#history {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 1.4fr 9fr;
    grid-template-columns: 1fr;
    border-radius: 5px;
    border: 2.5px solid var(--grey-200)
}

#filters {
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    background-color: red;
    padding: 15px;
}

#search {
    width: calc(100% - 10px);
    background-color: orange;
    padding: 5px;
}
</style>