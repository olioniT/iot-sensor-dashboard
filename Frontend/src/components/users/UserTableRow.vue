<template>
    <div class="row">
        <p>{{ user?.id }}</p>
        <p>{{ user?.username }}</p>
        <p>{{ user?.name }}</p>
        <p id="role" :class="role?.name.toLowerCase()">{{ role?.name }}</p>
        <p>{{ formatJoinDate(user.join_date) }}</p>
        <div class="actions">
            <button class="primary" @click="() => showDataOfUser(user.id)"><Icon icon="edit" color="var(--blue-200)" size="16px" />Edit</button>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/user';

import Icon from '@/components/Icon.vue';

export default {
    name: "UserTableRow",
    props: ["user"],
    components: {Icon},
    data() {
        return {
            userStore: useUserStore()
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

.actions > button {
    width: fit-content; height: 30px; font-size: 14px;
}
</style>