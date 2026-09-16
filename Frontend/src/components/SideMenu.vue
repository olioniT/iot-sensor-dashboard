<template>
    <div id="menu">
        <MenuItem to="/dashboard" icon="layout-grid" name="Dashboard"/>
        <MenuItem to="/sensors" icon="radio" name="Sensors"/>
        <MenuItem to="/reports" icon="chart" name="Reports"/>
        <MenuItem to="/users" icon="user" name="Users"/>
        <MenuItem to="/login" icon="layout-grid" name="Login"/>
    </div>
</template>

<script>
import MenuItem from './MenuItem.vue';

export default {
    name: "SideMenu",
    components: {MenuItem},
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
    background-color: var(--color-neutral-200);
    background-color: rgb(241, 241, 241);
}
</style>