<template>
    <div class="row">
        <p>{{ user?.id }}</p>
        <p>{{ user?.username }}</p>
        <p>{{ user?.name }}</p>
        <p id="role" :class="role?.name.toLowerCase()">{{ role?.name }}</p>
        <p>{{ formatJoinDate(user.join_date) }}</p>
        <div class="actions">
            <button class="danger" @click="() => deleteUser(user.id)"><Icon icon="delete" color="var(--red-200)" size="16px" />Delete</button>
            <button class="primary" @click="() => showDataOfUser(user.id)"><Icon icon="edit" color="var(--blue-200)" size="16px" />Edit</button>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/user';

import { useDialogs } from '@/composables/useDialogs';

import Icon from '@/components/Icon.vue';

export default {
    name: "UserTableRow",
    props: ["user"],
    components: {Icon},
    data() {
        return {
            userStore: useUserStore(),
            dialogs: useDialogs()
        }
    },
    computed: {
        role() {
            return this.userStore.getRoleOfUser(this.user.role)
        }
    },
    methods: {
        formatJoinDate(timestamp) {
            let date = timestamp.split("T")[0]
            
            let day = date.split("-")[2]
            let month = date.split("-")[1]
            let year = date.split("-")[0]
            
            return `${day}/${month}/${year}`
        },
        showDataOfUser(id) {
            this.$emit("showDataOfUser", id)
        },
        deleteUser(id) {
            let user = this.userStore.users.find(u => u.id === id)
            let name = user.name

            this.dialogs.showDeleteDialog("Delete user?", `Are you sure you want to delete ${user.name}?`, async () => {
                try {
                    const response = await fetch(`http://localhost:3000/api/user/${id}/delete`, {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({id: id})
                    })

                    if (!response.ok) {
                        throw new Error("Missing or invalid ID.")
                    }

                    const data = await response.json()

                    if (data.ok) {
                        this.userStore.removeUser(id)

                        useToast().show(`Successfully deleted ${name} (ID: ${id})`, "success")

                        this.emptyForm()
                    }
                } catch (err) {
                    console.error(err)
                    throw new Error(err.message)
                } 
            })
        }
    }
}
</script>

<style scoped>
.row {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: repeat(6, 1fr);
    padding: 0px 15px;
    background-color: inherit;
    border-bottom: 2px solid var(--grey-650);
}

.row:nth-last-child { align-self: flex-end; }
.row > .actions { width: 100%; display: flex; justify-content: flex-end; }

#role {
    width: fit-content;
    font-size: 14px;
    padding: 2.5px 10px;
    border-radius: 10px;
}

#role.admin {
    background-color: var(--red-450);
}

#role.user {
    background-color: var(--blue-450);
}

.actions {
    gap: 10px;
}

.actions > button {
    width: fit-content; height: 30px; font-size: 14px;
}
</style>