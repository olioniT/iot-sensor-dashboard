<template>
    <div id="app">
        <div id="view">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: "AuthLayout"
}
</script>

<style scoped>
#app {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

#view {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>