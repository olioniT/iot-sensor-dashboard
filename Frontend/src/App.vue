<template>
    APP LOADED
    <RouterView />
    <!-- <div id="app">
        <SideMenu />
        <div id="views">
            <SensorsView />
        </div>
    </div> -->
</template>

<script>
export default {
    name: "App",
    components: {},
    data() {
        return {

        }
    }
}
</script>

<style scoped>
#app {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

#views {
    width: calc(100vw - (var(--menu-width) - 15px));
    height: 100vh;
    padding: 0px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>