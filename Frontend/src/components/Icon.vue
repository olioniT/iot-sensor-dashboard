<template>
    <component :is="icon" :size="size || '12px'" :color="color || 'black'"/>
</template>

<script>
import { icons } from '../icons';

export default {
    name: "Icon",
    props: ["icon", "size", "color"],
    computed: {
        icon() {
            return icons[this.icon]
        }
    }
}
</script>

<style scoped>
</style>