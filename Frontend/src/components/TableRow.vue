<template>
    <div id="row">
        <p>{{ id }}</p>
        <p>{{ name }}</p>
    </div>
</template>

<script>
export default {
    name: "TableRow",
    props: ["id", "name"],
    components: {},
    data() {
        return {

        }
    }
}
</script>

<style scoped>
#row {
    width: calc(100% - 10px);
    height: 60px;
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 20px;
    justify-content: flex-start;
    background-color: inherit;
    border-bottom: 2px solid rgb(231, 231, 231);
    padding: 0px 5px;
}
</style>