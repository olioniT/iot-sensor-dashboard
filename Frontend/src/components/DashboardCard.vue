<template>
    <div id="card">
        <div id="icon">
            <component size="60%" color="rgb(27, 129, 224)" :is="cardIcon"/>
        </div>
        <div id="info">
            <p id="title">{{ this.title }}</p>
            <h1 id="data">{{ this.data }}</h1>
            <p id="subtitle">{{ this.subtitle }}</p>
        </div>
    </div>
</template>

<script>
import { icons } from '../icons';

export default {
    name: "DashboardCard",
    components: {},
    props: ["icon", "title", "subtitle", "data"],
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
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    display: grid;
    grid-template-columns: 2fr 8fr;
    grid-template-rows: 1fr;
    gap: 15px;
    border: 3px solid rgb(223, 223, 223);
    border-radius: 10px;
    padding: 15px;
}

#icon {
    height: 100%;
    aspect-ratio: 1 / 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(90, 173, 250);
    border-radius: 10px;
}

#info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 5px;
}

#title { font-size: 18px; }
#subtitle { font-weight: 300; font-style: italic; }
</style>