<template>
    <div id="card">
        <div id="icon" :style="{backgroundColor: `var(--${color}-200)`}">
            <Icon :icon="icon" size="48px" :color="`var(--${color}-500)`"/>
        </div>
        <div id="info">
            <p id="title">{{ title }}</p>
            <p id="data">{{ data }}</p>
            <p id="subtitle">{{ subtitle }}</p>
        </div>
    </div>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
    name: "DashboardCard",
    components: {Icon},
    props: ["icon", "title", "subtitle", "data", "color"],
    data() {
        return {
            
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
#subtitle { color: var(--grey-400); font-style: italic; }
#data { font-size: 28px; font-weight: 800; }
</style>