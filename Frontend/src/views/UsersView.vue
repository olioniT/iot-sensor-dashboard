<template>
    <div id="view">
        <UserTable @viewProfile="viewProfile"/>
        <div id="profile">
            <div id="picture">
                <Icon icon="user" color="var(--grey-600)" size="85%"/>
            </div>
            <div id="info">
                <div class="group">
                    <input ref="name" type="text" placeholder="John Smith">
                    <DropDown :value="role.name" placeholder="Role"/>
                </div>
                <input ref="username" type="text" placeholder="00000000">
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
import DropDown from '@/components/DropDown.vue';

export default {
    name: "UsersView",
    components: {UserTable, Icon, DropDown},
    data() {
        return {
            role: ""
        }
    },
    methods: {
        viewProfile(user, role) {
            this.$refs.name.value = user.name

            this.role = role

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
    font-size: 16px;
}

.group {
    width: 100%;
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