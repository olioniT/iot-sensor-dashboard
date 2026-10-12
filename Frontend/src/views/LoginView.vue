<template>
    <div id="view">
        <div id="form">
            <div id="header">
                <h1>Welcome back!</h1>
                <p>Log in to view all your sensors.</p>
            </div>
            <div id="body">
                <div class="group">
                    <p class="label">Username</p>
                    <input
                        type="text"
                        ref="username"
                        name="username"
                        placeholder="Enter username here..."
                        @keyup="() => this.verifyInput('username')"
                        :class="form.usernameIsValid ? 'error' : ''"
                    >
                    <div class="error-info">
                        <p class="error-msg" v-if="form.usernameIsValid">Please enter a valid username.</p>
                    </div>
                </div>
                <div class="group">
                    <p class="label">Password</p>
                    <input
                        type="password"
                        ref="password"
                        name="password"
                        placeholder="Enter your password"
                        @keyup="() => this.verifyInput('password')"
                        :class="form.passwordIsValid ? 'error' : ''"
                    >
                    <div class="error-info">
                        <p class="error-msg" v-if="form.passwordIsValid">Please enter a valid password.</p>
                    </div>
                </div>
            </div>
            <button class="primary" @click="logIn">Log In</button>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '../stores/user.js';

import { useToast } from '@/composables/useToast.js';

export default {
    name: "LoginView",
    data() {
        return {
            form: {
                usernameIsValid: false,
                passwordIsValid: false
            },
        }
    },
    methods: {
        verifyInput(refType) {
            const inputValue = this.$refs[refType].value

            if (inputValue == "") {
                this.form[`${refType}IsValid`] = true
            } else {
                this.form[`${refType}IsValid`] = false
            }
        },
        async logIn() {
            const user = this.$refs.username.value
            const pass = this.$refs.password.value

            if (user === "" || pass === "") {
                throw new Error("Please enter a valid username and password.")
            }

            try {
                const response = await fetch("http://localhost:3000/api/auth/login", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({user, pass})
                })

                if (!response.ok) {
                    throw new Error("Username or password is incorrect!")
                }

                const data = await response.json()
                useUserStore().setUser(data.user)
                
                if (data.ok) {
                    useToast().show(`Successfully logged in as ${data.user.name}!`, "success")
                    this.$router.push("/dashboard")
                }
            } catch (err) {
                console.error(err)
                throw new Error(err.message)
            }
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
    width: 400px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 5px;
    gap: 20px;
}

#header {
    width: 100%;
    height: 60px;
}

#body {
    width: 100%;
    height: 280px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 25px;
}

.group {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.group > .label {
    width: 100%;
    height: fit-content;
    padding: 4px 0px;
    color: var(--grey-350);
    margin-bottom: 2.5px;
}

.group > input {
    width: calc(100% - 30px);
    height: 7.5px;
    font-size: 16px;
    padding: 15px;
    transition: 0.15s;
    background-color: var(--grey-700);
}

.group > input.error {
    outline: 6px solid var(--red-300);
}

.group > .error-info {
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0px;
    margin-top: 5px;
}

.group > .error-info > .error-msg {
    color: var(--red-500);
}

button {
    width: 100%;
    cursor: pointer;
    padding: 17.5px 0px;
    color: var(--white);
    font-weight: 800;
    border-radius: 5px;
}

button:hover {
    background-color: var(--blue-500);
}
</style>