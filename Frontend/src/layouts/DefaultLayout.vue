<template>
    <div id="app">
        <SideMenu />
        <div id="view">
            <div id="title">
                <h1 v-if="title">{{ this.title }}</h1>
                <p v-if="subtitle">{{ this.subtitle }}</p>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import SideMenu from "../components/SideMenu.vue"

export default {
    name: "DefaultLayout",
    components: {SideMenu},
    data() {
        return {
            title: "",
            subtitle: ""
        }
    },
    beforeRouteUpdate() {
        console.log("AHHHH")

        this.layoutTitle()
        this.layoutSubtitle()
    },
    methods: {
        layoutTitle() {
            return this.$router.currentRoute.value.meta.title
        },
        layoutSubtitle() {
            return this.$router.currentRoute.value.meta.subtitle
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

#view {
    width: calc(100vw - 30px);
    height: calc(100vh - 30px);
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    /* background-color: red; */
    gap: 5px;
}
</style>