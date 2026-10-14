<template>
    <div id="table">
        <div id="header">
            <input type="text" id="search" placeholder="Search by name or ID">
        </div>
        <div id="body">
            <UserTableRow v-if="users.length > 0" v-for="user in users" :user="user" @click="() => viewProfile(user)"/>
            <p id="no-users" v-else>No users found. Please contact your administrator to create one.</p>
        </div>
    </div>
</template>

<script>
import { useUserStore } from "@/stores/user";

import UserTableRow from "@/components/users/UserTableRow.vue"

export default {
    name: "UserTable",
    props: [],
    components: {UserTableRow},
    data() {
        return {
            userStore: useUserStore()
        }
    },
    methods: {
        viewProfile(user) {
            let role = this.userStore.getRoleOfUser(user.role)

            console.log(user, role)

            this.$emit("viewProfile", user, role)
        }
    },
    async mounted() {
        await this.userStore.fetchAllUsers()
        await this.userStore.fetchAllRoles()
    },
    computed: {
        users() {
            return this.userStore.getAllUsers
        }
    }
}
</script>

<style scoped>
#table {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 0.75fr 9.25fr;
    grid-template-columns: 1fr;
}

#header {
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: var(--grey-750);
    padding: 15px;
}

#body {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
}

#no-users {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: var(--grey-400)
}
</style>