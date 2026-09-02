<template>
    <div id="item">
        <div>
            
        </div>
        <p id="text">{{ name }}</p>
    </div>
</template>

<script>

export default {
    name: "MenuItem",
    components: {},
    props: ["icon", "name"],
    data() {
        return {

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
    border-radius: 5px;
    padding: 0px 15px;
}

#item:hover { background-color: var(--item-hover); }
#item.active { background-color: var(--item-active); }

#text {
    font-weight: 600;
    font-size: 20px;
}
</style>