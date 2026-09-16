<template>
    <div id="app">
        <SideMenu />
        <div id="view">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import SideMenu from "../components/SideMenu.vue"

export default {
    name: "DefaultLayout",
    components: {SideMenu}
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

#view {
    height: 100vh;
    padding: 0px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>