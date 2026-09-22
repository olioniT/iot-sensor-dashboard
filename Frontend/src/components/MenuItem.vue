<template>
    <RouterLink :to="to" id="item" :class="isCurrentRoute() ? 'active' : ''">
        <Icon :icon="icon" size="24px" :color="isCurrentRoute() ? 'var(--grey-800)' : 'var(--grey-700)'"/>
        <p id="text">{{ name }}</p>
    </RouterLink>
</template>

<script>
import Icon from './Icon.vue';

export default {
    name: "MenuItem",
    components: {Icon},
    props: ["to", "icon", "name"],
    data() {
        return {
            
        }
    },
    methods: {
        isCurrentRoute() {
            if (this.to === this.$router.currentRoute.value.path) {
                return true
            } else {
                return false
            }
        }
    }
}
</script>

<style scoped>
#item {
    width: calc(100% - 30px);
    height: 45px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: inherit;
    cursor: pointer;
    gap: 10px;
    border-radius: 5px;
    padding: 0px 15px;
    text-decoration: none;
    color: var(--grey-700);
}

#item:hover { background-color: var(--grey-300); }
#item.active { background-color: var(--grey-100); color: var(--grey-800); }

#text {
    font-weight: 600;
    font-size: 20px;
}
</style>