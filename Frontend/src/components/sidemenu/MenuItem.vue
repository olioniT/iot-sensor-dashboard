<template>
    <RouterLink :to="to" id="item" :class="isCurrentRoute() ? 'active' : ''">
        <Icon :icon="icon" size="24px" :color="color"/>
        <p id="text" :style="{color: color}">{{ name }}</p>
    </RouterLink>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
    name: "MenuItem",
    components: {Icon},
    props: ["to", "icon", "name", "color"],
    data() {
        return {
            
        }
    },
    methods: {
        isCurrentRoute() {
            let currentRoute = `/${this.$router.currentRoute.value.path.split("/")[1]}`
            let propRoute = `/${this.to.split("/")[1]}`

            if (propRoute === currentRoute) {
                return true
            } else {
                return false
            }
        }
    }
}
</script>

<style scoped>
</style>