<template>
    <component :is="currentLayout">
        <RouterView />
    </component>
</template>

<script>
export default {
    name: "App",
    components: {},
    data() {
        return {}
    },
    computed: {
        currentLayout() {
            return this.$router.currentRoute.value.meta.layout
        }
    }
}
</script>

<style scoped>
</style>