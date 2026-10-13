<template>
    <div id="view">
        <UserTable @viewProfile="viewProfile"/>
        <div id="profile">
            <div id="picture">
                <Icon icon="user" color="var(--grey-600)" size="85%"/>
            </div>
            <div id="info">
                <div class="group">
                    <input ref="name" type="text">
                    <!-- <input ref="role" type="text" disabled> -->
                    <DropDown />
                </div>
                <input ref="username" type="text">
                <div class="group">
                    <button class="danger disabled">Delete</button>
                    <button class="primary">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserTable from '@/components/users/UserTable.vue';
import Icon from '@/components/Icon.vue';
import DropDown from '@/components/history/DropDown.vue';

export default {
    name: "UsersView",
    components: {UserTable, Icon, DropDown},
    methods: {
        viewProfile(user, role) {
            this.$refs.name.value = user.name
            this.$refs.role.value = role.name
            this.$refs.username.value = user.username
        }
    }
}
</script>

<style scoped>
#view {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 15px;
}

#profile {
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    background-color: var(--grey-750);
    gap: 15px;
}

#picture {
    width: 200px;
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
}

.group {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

button {
    width: 80px;
    min-width: 50px;
}
</style>