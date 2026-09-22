<template>
    <div id="card">
        <div id="icon" :style="{backgroundColor: `var(--${color}-200)`, color: `var(--${color}-500)`}">
            <component :is="cardIcon" size="48"/>
        </div>
        <div id="info">
            <p id="title">{{ title }}</p>
            <p id="data">{{ data }}</p>
            <p id="subtitle">{{ subtitle }}</p>
        </div>
    </div>
</template>

<script>
import { icons } from '../icons';

export default {
    name: "DashboardCard",
    components: {},
    props: ["icon", "title", "subtitle", "data", "color"],
    data() {
        return {
            
        }
    },
    computed: {
        cardIcon() {
            return icons[this.icon]
        }
    }
}
</script>

<style scoped>
#card {
    width: calc(100% - 25px);
    /* height: calc(100% - 25px); */
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding: 10px;
    gap: 12.5px;
    border: 2.5px solid var(--grey-200);
}

#icon {
    height: 100px;
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    border-radius: 5px;
    justify-content: center;
}

#info {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 5px;
    /* background-color: lime; */
}

#title, #subtitle { font-size: 16px; }
#subtitle { color: var(--grey-500); font-style: italic; }
#data { font-size: 28px; font-weight: 800; }
</style>