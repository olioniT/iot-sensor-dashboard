<template>
    <div id="app">
        <SideMenu />
        <div id="view">
            <div id="info">
                <h1>{{ this.layoutTitle }}</h1>
                <p>{{ this.layoutSubtitle }}</p>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import SideMenu from "@/components/sidemenu/SideMenu.vue"

export default {
    name: "DefaultLayout",
    components: {SideMenu},
    data() {
        return {
            title: "",
            subtitle: ""
        }
    },
    computed: {
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
    gap: 10px;
}

#info {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
}
</style>