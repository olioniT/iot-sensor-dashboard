<template>
    <div id="view">
        <div id="form">
            <h1>Log In</h1>
            <div class="group">
                <label for="">Username</label>
                <input type="text">
            </div>
            <div class="group">
                <label for="">Password</label>
                <input type="password">
            </div>
            <button class="bg-red-300" @click="goToDashboard">Log In</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoginView",
    methods: {
        goToDashboard() {
            this.$router.push("/dashboard")
        }
    }
}
</script>

<style scoped>
#view {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

#form {
    width: 27.5vw;
    height: 35vh;
    padding: 35px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    background-color: rgb(241, 241, 241);
    border-radius: 5px;
    gap: 5px;
}

.group {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 5px;   
}

.group > label {
    width: 50%;
    margin-left: -10px;
    font-size: 20px;
}

.group > input {
    width: 50%;
    font-size: 16px;
    padding: 5px;
    border-radius: 2.5px;
}

.group > input:focus {
    outline: 4px rgb(140, 190, 255) solid;
}

button {
    width: 30%;
    cursor: pointer;
    padding: 10px 20px;
    background-color: rgb(75, 75, 255);
    color: white;
    border-radius: 5px;
}
</style>