<template>
    <div id="view">
        <div id="form">
            <h1>Log In</h1>
            <div class="group">
                <p class="error-msg" v-if="error">Please enter a valid username.</p>
                <input type="text" name="username" placeholder="Username" :class="error ? 'error' : ''">
            </div>
            <div class="group">
                <p class="error-msg" v-if="error">Please enter a valid password.</p>
                <input type="password" name="password" placeholder="Password" :class="error ? 'error' : ''">
            </div>
            <button class="bg-red-300" @click="goToDashboard">Log In</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoginView",
    data() {
        return {
            error: false
        }
    },
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
    width: calc(20vw - 100px);
    height: calc(45vh - 100px);
    padding: 50px;
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

.group > .error-msg {
    color: rgb(255, 98, 98);
    padding: 2.5px 0px;
}

.group > input {
    width: 100%;
    font-size: 16px;
    padding: 15px;
    border-radius: 2.5px;
    transition: 0.15s;
    outline: 4px rgb(241, 241, 241) solid;
}

.group > input:focus { outline: 6px rgb(140, 190, 255) solid; }
.group > input.error { outline: 6px rgb(255, 168, 168) solid; }

button {
    width: 100%;
    cursor: pointer;
    padding: 12.5px;
    background-color: rgb(75, 75, 255);
    color: white;
    border-radius: 5px;
}
</style>