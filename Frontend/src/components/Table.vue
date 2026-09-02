<template>
    <div id="table">
        <div id="header">
        </div>
        <div id="body">
        </div>
    </div>
</template>

<script>
export default {
    name: "Table",
    props: [],
    components: {},
    data() {
        return {

        }
    }
}
</script>

<style>
#table {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: red;
}

#header {
    width: 100%;
    height: 50px;
    background-color: green;
}
</style>