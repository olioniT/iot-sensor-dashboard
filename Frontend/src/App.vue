<template>
    <div id="app">
        <SideMenu />
        <div id="views">
            <SensorsView />
        </div>
    </div>
</template>

<script>
import SideMenu from './components/SideMenu.vue';
import SensorsView from './views/SensorsView.vue';

export default {
    name: "App",
    components: {SideMenu, SensorsView},
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
    width: calc(100vw - var(--menu-width));
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>