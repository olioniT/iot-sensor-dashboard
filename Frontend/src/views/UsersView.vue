<template>
    <div id="view">
        <div id="cards">
            <div class="card">
                <span class="icon">
                    <Icon size="75px" icon="users" color="var(--grey-750)"/>
                </span>
                <span class="info">
                    <p>{{ userStore.getAllUsers.length }}</p>
                    <p>Total users</p>
                </span>
            </div>
            <div class="card">
                <span class="icon">
                    <Icon size="75px" icon="role" color="var(--grey-750)"/>
                </span>
                <span class="info">
                    <p>{{ userStore.getAllRoles.length }}</p>
                    <p>Total roles</p>
                </span>
            </div>
        </div>
        <UserTable @viewProfile="viewProfile"/>
        <button class="secondary" @click="() => dialogs.showUserDialog(-1, 'Create a user', () => console.log('dwasdwasd'))">Create</button>
    </div>
</template>

<script>
import UserTable from '@/components/users/UserTable.vue';
import Icon from '@/components/Icon.vue';
import DropDown from '@/components/DropDown.vue';

import { useUserStore } from '@/stores/user';

import { useDialogs } from '@/composables/useDialogs';

export default {
    name: "UsersView",
    components: {UserTable, Icon, DropDown},
    data() {
        return {
            userStore: useUserStore(),

            form: {
                id: null,
                username: "",
                name: "",
                role: {
                    id: null,
                    name: "",
                    description: ""
                }
            },

            dialogs: useDialogs()
        }
    },
    computed: {
        roles() {
            let roles = []
            
            this.userStore.getAllRoles.forEach(role => roles.push(role.name))

            return roles
        }
    },
    methods: {
        viewProfile(user, role) {
            console.log(role)

            this.form = {
                id: user.id,
                username: user.username,
                name: user.name,
                role: {
                    id: role.id,
                    name: role.name,
                    description: role.description
                }
            }
        },
        emptyForm() {
            this.form = {
                id: null,
                username: "",
                name: "",
                role: {
                    id: null,
                    name: "",
                    description: ""
                }
            }
        }
    }
}
</script>

<style scoped>
#view {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 0.5fr 2.5fr;
    grid-template-columns: 1fr;
    gap: 10px;
}

#cards {
    display: flex; gap: 10px;
}

.card {
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: var(--grey-750);
    padding: 10px;
    gap: 10px;
}

.icon {
    height: 100%;
    aspect-ratio: 1 / 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--grey-650);
    border-radius: 5px;
}

.info { display: flex; flex-direction: column; gap: 5px; }
.info > p  { color: var(--grey-200); }
.info > p:first-child { font-size: 24px; font-weight: bold; }
.info > p:last-child { color: var(--grey-400); }

#profile {
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    background-color: var(--grey-750);
    gap: 10px;
}

#picture {
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1 / 1;
    background-color: var(--grey-700);
    border-radius: 50%;
}

#info {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

#info input {
    width: calc(100% - 20px);
    padding: 10px;
    font-size: 16px;
}

.actions {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
}

button {
    width: 80px;
    min-width: 50px;
}

#view > button {
    justify-self: flex-end;
}
</style>