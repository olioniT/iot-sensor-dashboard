<template>
    <div id="dropdown">
        <div id="select" @click="toggleOptions">
            <p v-if="this.value !== undefined">{{ this.value }}</p>
            <p v-else-if="this.selected !== ''">{{ this.selected }}</p>
            <p v-else id="placeholder">{{ placeholder }}</p>
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
import Icon from '@/components/Icon.vue';

export default {
    name: "DropDown",
    components: {Icon},
    props: ["value", "placeholder", "options"],
    data() {
        return {
            showOptions: false,
            selected: ""
        }
    },
    methods: {
        toggleOptions() {
            this.showOptions = !this.showOptions
        },
        selectOption(option) {
            this.selected = option

            this.showOptions = false
            this.$emit("userPicked", option)
        }
    }
}
</script>

<style scoped>
#dropdown {
    width: calc(100% - 20px);
    /* height: fit-content; */
    padding: 10px;
    position: relative;
    background-color: var(--grey-700);
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

#placeholder { color: var(--grey-450) }

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
    background-color: var(--grey-650);
}
</style>