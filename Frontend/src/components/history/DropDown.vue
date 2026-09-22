<template>
    <div id="dropdown">
        <div id="select" @click="toggleOptions">
            <p>{{ placeholder }}</p>
            
        </div>
        <div id="options" v-if="showOptions">
        </div>
    </div>
</template>

<script>
export default {
    name: "DropDown",
    props: ["placeholder", "options"],
    data() {
        return {
            showOptions: false,
            value: ""
        }
    },
    methods: {
        toggleOptions() {
            this.showOptions = !this.showOptions
        }
    }
}
</script>

<style scoped>
#dropdown {
    width: calc(100% - 10px);
    height: fit-content;
    background-color: orange;
    padding: 5px;
    position: relative;
}

#options {
    width: inherit;
    height: 200px;
    position: absolute;
    background-color: gold;
    top: 100%;
    left: 0;
    padding: 5px;
}
</style>