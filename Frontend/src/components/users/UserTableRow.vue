<template>
    <div class="row">
        <p>{{ user.id }}</p>
        <p>{{ user.username }}</p>
        <p>{{ user.name }}</p>
        <p>{{ role.name }}</p>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/user';

export default {
    name: "UserTableRow",
    props: ["user"],
    data() {
        return {
            userStore: useUserStore()
        }
    },
    computed: {
        role() {
            return this.userStore.getRoleOfUser(this.user.role)
        }
    }
}
</script>

<style scoped>
.row {
    width: 100%;
    box-sizing: border-box;
    height: 50px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    text-align: left;
    font-size: 18px;
    background-color: inherit;
    border-bottom: 2px solid var(--grey-650);
    padding: 0px 15px;
    cursor: pointer;
}

.row:hover { background-color: var(--grey-850); }

.row > p { margin: 0; }
.row > p:first-child { text-align: left; }

/* .info > p:first-child { font-size: 18px; }
.info > p:last-child { font-size: 14px; color: var(--grey-400) } */

.status {
    min-width: 50px;
    width: fit-content;
    justify-self: center;
    font-size: 12px;
    padding: 5px 15px;
    border-radius: 15px;
}
</style>