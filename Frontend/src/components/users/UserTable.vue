<template>
    <div id="table">
        <div id="header">
            <input type="text" id="search" placeholder="Search by name or ID">
            <div id="cols">
                <p>ID</p>
                <p>Username</p>
                <p>Name</p>
                <p>Role</p>
                <p>Join Date</p>
                <p>Actions</p>
            </div>
        </div>
        <div id="body">
            <UserTableRow v-if="users.length > 0" v-for="user in users" :user="user" @showDataOfUser="(userID) => viewProfile(userID)"/>
            <p id="no-users" v-else>No users found. Please contact your administrator to create one.</p>
        </div>
    </div>
</template>

<script>
import { useUserStore } from "@/stores/user";

import UserTableRow from "@/components/users/UserTableRow.vue"

import { useDialogs } from "@/composables/useDialogs";

export default {
    name: "UserTable",
    props: [],
    components: {UserTableRow},
    data() {
        return {
            userStore: useUserStore(),
            dialogs: useDialogs()
        }
    },
    methods: {
        viewProfile(userID) {
            let user = this.userStore.getAllUsers.find(u => u.id === userID)
            let role = this.userStore.getAllRoles.find(r => r.id === user.role)

            this.dialogs.showUserDialog(user.id, `Edit user #${user.id}`, "existing", () => {console.log("CANCELED")})
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
    grid-template-rows: auto minmax(0, 1fr);
    grid-template-columns: 1fr;
}

#header {
    width: 100%;
    height: fit-content;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: var(--grey-750);
    padding: 10px 15px;
    gap: 10px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

#cols {
    width: 100%;
    display: grid;
    justify-content: center;
    align-items: center;
    gap: 10px;
    grid-template-columns: repeat(6, 1fr);
}

#cols > p { font-size: 14px; color: var(--grey-450); }
#cols > p:last-child { justify-self: flex-end; }

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