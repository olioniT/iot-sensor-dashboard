import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            user: {}
        }
    },
    getters: {
        getUser() {
            return this.user
        }
    },
    actions: {
        userIsLoggedIn() {
            return Object.keys(this.user).length !== 0
        },
        setUser(user) {
            this.user = user
        }
    }
})