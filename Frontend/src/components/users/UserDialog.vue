<template>
    <div id="overlay">
        <div id="dialog">
            <h1>USER DIALOG</h1>
        </div>
    </div>
</template>

<script>
export default {
    name: "SensorDialog",
    props: [],
    components: {},
    data() {
        return {

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
</style>