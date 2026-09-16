<template>
    <Toast v-if="toast"/>
    <component :is="currentLayout">
        <RouterView />
    </component>
</template>

<script>
import Toast from './components/Toast.vue';

export default {
    name: "App",
    components: {Toast},
    data() {
        return {
            toast: false
        }
    },
    methods: {
        showToast() {
            this.toast = true
        }
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