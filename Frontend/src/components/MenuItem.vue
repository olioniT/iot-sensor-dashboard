<template>
    <RouterLink :to="to" id="item" :class="isCurrentRoute() ? 'active' : ''">
        <component :is="itemIcon" />
        <p id="text">{{ name }}</p>
    </RouterLink>
</template>

<script>
import { icons } from '../icons';


export default {
    name: "MenuItem",
    components: {},
    props: ["to", "icon", "name"],
    data() {
        return {
            
        }
    },
    computed: {
        itemIcon() {
            return icons[this.icon]
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
    height: 55px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: inherit;
    cursor: pointer;
    gap: 10px;
    border-radius: 5px;
    padding: 0px 15px;
    text-decoration: none;
    color: black;
}

#item:hover { background-color: var(--item-hover); }
#item.active { background-color: var(--item-active); }

#text {
    font-weight: 600;
    font-size: 20px;
}
</style>