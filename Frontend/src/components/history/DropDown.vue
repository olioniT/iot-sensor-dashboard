<template>
    <div id="dropdown">
        <div id="select" @click="toggleOptions">
            <p>{{ this.value || placeholder }}</p>
            <Icon :icon="this.showOptions ? 'chevron-up' : 'chevron-down'"/>
        </div>
        <div id="options" v-if="showOptions">
            <p class="option" v-for="option in options" @click="(e) => selectOption(option)">
                {{ option }}
            </p>
        </div>
    </div>
</template>

<script>
import Icon from '../Icon.vue';

export default {
    name: "DropDown",
    components: {Icon},
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
        },
        selectOption(option) {
            this.value = option
            this.showOptions = false
        }
    }
}
</script>

<style scoped>
#dropdown {
    width: calc(100% - 10px);
    height: fit-content;
    padding: 5px 10px;
    position: relative;
    background-color: var(--grey-100);
    font-size: 16px;
    border-radius: 2.5px;
}

#select {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#options {
    width: 100%;
    height: fit-content;
    position: absolute;
    top: 100%;
    left: 0;
    font-size: 16px;
    background-color: inherit;
}

.option {
    padding: 5px 10px;
}

.option:hover {
    background-color: var(--grey-200);
}
</style>