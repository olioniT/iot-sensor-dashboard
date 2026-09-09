<template>
    <div id="menu">
        <MenuItem icon="layout-grid" name="Dashboard"/>
        <MenuItem icon="radio" name="Sensors"/>
        <MenuItem icon="chart" name="Reports"/>
        <MenuItem icon="user" name="Users"/>
    </div>
</template>

<script>
import MenuItem from './MenuItem.vue';
import { LayoutGrid } from '@lucide/vue';

export default {
    name: "SideMenu",
    components: {MenuItem, LayoutGrid},
    data() {
        return {

        }
    }
}
</script>

<style scoped>
#menu {
    width: var(--menu-width);
    height: calc(100vh - 48px);
    padding: 24px 12px;
    background-color: rgb(228, 228, 228);
}
</style>