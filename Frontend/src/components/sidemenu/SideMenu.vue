<template>
    <div id="menu">
        <div class="group">
            <MenuItem to="/dashboard" icon="layout-grid" name="Dashboard" color="var(--grey-50)"/>
            <MenuItem to="/sensors" icon="radio" name="Sensors" color="var(--grey-50)"/>
            <MenuItem to="/history/sensor/0" icon="chart" name="History" color="var(--grey-50)"/>
            <MenuItem to="/users" icon="user" name="Users" color="var(--grey-50)" v-if="user.role === 1"/>
        </div>
        <div class="group">
            <div id="user">
                <div id="profile-picture">
                    <Icon icon="user" size="44" color="var(--grey-500)"/>
                </div>
                <div id="info">
                    <p id="name">{{ user.name }}</p>
                    <p id="username">{{ user.username }}</p>
                </div>
                <Icon icon="log-out" size="24" id="log-out" color="var(--grey-400)" @click="logOut"/>
            </div>
        </div>
    </div>
</template>

<script>

import MenuItem from './MenuItem.vue';
import Icon from '../Icon.vue';

import { useUserStore } from '@/stores/user.js';
import { useToast } from '@/composables/useToast.js';

export default {
    name: "SideMenu",
    components: {MenuItem, Icon},
    data() {
        return {
            toast: useToast()
        }
    },
    computed: {
        user() {
            return useUserStore().getCurrentUser
        }
    },
    methods: {
        logOut() {
            useUserStore().setUser({})
            this.$router.push("/login")
        },
        toastTest() {
            this.toast.show("Logging out.", "info", 5000)
        }
    }
}
</script>

<style scoped>
#menu {
    width: var(--menu-width);
    height: calc(100vh - 24px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background-color: var(--grey-900);
}

.group {
    width: inherit;
}

#item {
    width: calc(100% - 30px);
    height: 45px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: inherit;
    cursor: pointer;
    gap: 10px;
    border-radius: 2.5px;
    padding: 0px 15px;
    text-decoration: none;
}

#item:hover { background-color: var(--grey-950); }
#item.active { background-color: var(--grey-800); }

#text {
    font-weight: 600;
    font-size: 20px;
    color: var(--white);
}

#user {
    width: var(--menu-width);
    height: fit-content;
    display: grid;
    grid-template-columns: 1fr 3fr 0.75fr;
    justify-content: center;
    align-items: center;
    gap: 15px;
    padding: 5px 0px;
}

#profile-picture {
    width: 50px;
    aspect-ratio: 1 / 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: var(--grey-700);
}

#info { width: 100%; }
#name { font-size: 18px; color: var(--grey-200); font-weight: bold; }
#username { font-size: 14px; color: var(--grey-400); }

#log-out { cursor: pointer; }
</style>