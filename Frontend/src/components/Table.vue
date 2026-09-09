<template>
    <div id="table">
        <div id="header">
        </div>
        <div id="body">
            <TableRow v-for="row in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]" />
        </div>
    </div>
</template>

<script>
import TableRow from './TableRow.vue';

export default {
    name: "Table",
    props: [],
    components: {TableRow},
    data() {
        return {
            
        }
    }
}
</script>

<style>
#table {
    width: 100%;
    height: 82.5vh;
}

#header {
    width: 100%;
    height: 50px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: red;
}

#body {
    width: 100%;
    height: calc(82.5vh - 50px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow-y: scroll;
}
</style>