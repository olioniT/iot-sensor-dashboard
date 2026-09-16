<template>
    <div id="toast">
        <div id="alert">
            <component />
            <p>HELLO</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Toast"
}
</script>

<style scoped>
#toast {
    width: calc(100vw - 50px);
    height: calc(100vh - 50px);
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    position: absolute;
    padding: 25px;
}

#alert {
    width: fit-content;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: purple;
    padding: 5px 10px;
    border-radius: 5px;
}
</style>