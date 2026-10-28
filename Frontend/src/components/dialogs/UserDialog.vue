<template>
    <div id="overlay">
        <div id="dialog">
            <h1 id="title">{{ dialogs.state.userDialogTitle }}</h1>
            <div id="form">
                <span style="display: grid; grid-template-columns: 2fr 1fr; gap: 10px;">
                    <span>
                        <p>Username</p>
                        <input type="text" v-model="currentUser.username">
                    </span>
                    <span>
                        <p>Role</p>
                        <DropDown
                            placeholder="Role"
                            :options="roles"
                            :value="currentUser.role"
                            @userPicked="(setRole) => currentUser.role = setRole"
                        />
                    </span>
                </span>
                <span>
                    <p>Name</p>
                    <input type="text" v-model="currentUser.name">
                </span>
                <span>
                    <p v-if="dialogs.state.userDialogType === 'existing'">New Password (optional)</p>
                    <p v-if="dialogs.state.userDialogType === 'new'">Password</p>
                    <input type="text" v-model="currentUser.password">
                </span>
            </div>
            <div id="actions">
                <button class="secondary" @click="() => dialogs.dismissDialog()">Cancel</button>
                <button v-if="dialogs.state.userDialogType === 'new'" class="primary" @click="() => createNewUser()">Create</button>
                <button v-if="dialogs.state.userDialogType === 'existing'" class="primary" @click="() => saveExistingUser()">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
import DropDown from '../DropDown.vue';

import { useUserStore } from '@/stores/user.js';

import { useToast } from '@/composables/useToast.js';
import { useDialogs } from '@/composables/useDialogs.js';

export default {
    name: "SensorDialog",
    props: ["userDetails"],
    components: {DropDown},
    data() {
        return {
            dialogs: useDialogs(),
            userStore: useUserStore(),
        }
    },
    computed: {
        currentUser() {
            if (!isNaN(this.dialogs.state.userDialogID) && this.dialogs.state.userDialogID > 0) {
                let user = this.userStore.getAllUsers.find(u => u.id === this.dialogs.state.userDialogID)
                let role = this.userStore.getAllRoles.find(r => r.id === user.role)

                return {
                    id: user.id,
                    username: user.username,
                    password: "",
                    role: role.name,
                    name: user.name
                }
            } else {
                return {
                    id: 0,
                    username: "",
                    password: "",
                    role: "",
                    name: ""
                }
            }
        },
        roles() {
            return this.userStore.getAllRoles.map(r => r.name)
        }
    },
    methods: {
        emptyForm() {
            this.currentUser = {
                username: user.username,
                password: "",
                role: role.name,
                name: user.name
            }
        },
        async createNewUser() {
            try {
                let user = this.currentUser
                let role = this.userStore.getAllRoles.find(r => r.name === user.role)

                if (user.username === "" || user.password === "" || user.role === "" || user.name === "") {
                    throw new Error("Please fill in all the details.")
                }

                let newUser = {
                    name: user.name,
                    username: user.username,
                    password: user.password,
                    role: role.id
                }

                const response = await fetch("http://localhost:3000/api/user/create", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(newUser)
                })

                if (!response.ok) {
                    throw new Error("Missing or invalid information.")
                }

                const data = await response.json()

                if (data.ok) {
                    this.userStore.createUser(data.user)
                    
                    useToast().show(`Successfully created ${data.user.name} (ID: ${data.user.id})`, "success")
                    
                    this.emptyForm()
                    this.dialogs.dismissDialog()
                }
            } catch (err) {
                console.error(err)
                throw new Error(err.message)
            }
        },
        async saveExistingUser() {
            let user = this.currentUser
            let role = this.userStore.getAllRoles.find(r => r.name === user.role)

            console.log(user.password)

            let updatedUser = {
                id: user.id,
                name: user.name,
                username: user.username,
                password: user.password ?? "",
                role: role.id
            }

            console.log(user)

            const response = await fetch(`http://localhost:3000/api/user/${updatedUser.id}/edit`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(updatedUser)
            })

            if (!response.ok) {
                throw new Error("Missing or invalid information.")
            }

            const data = await response.json()

            if (data.ok) {
                this.userStore.updateUser(data.user)

                useToast().show(`Successfully updated ${data.user.name} (ID: ${data.user.id})`, "success")

                this.emptyForm()
                this.dialogs.dismissDialog()
            }
        }
    }
}
</script>

<style scoped>
#overlay {
    width: 100vw;
    height: 100vh;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);
}

#dialog {
    width: 350px;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 2.5px;
    background-color: var(--grey-750);
    padding: 20px;
}

#title {
    width: 100%;
    height: fit-content;
    text-align: center;
}

#form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
}

span {
    width: 100%;
    display: flex;
    gap: 2.5px;
    flex-direction: column;
}

span > p { color: var(--grey-450) }
span > input { width: calc(100% - 20px); padding: 10px; font-size: 16px; }

#actions {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
</style>