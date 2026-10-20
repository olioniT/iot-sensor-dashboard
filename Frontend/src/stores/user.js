import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            currentUser: {},
            users: [],
            roles: []
        }
    },
    getters: {
        getCurrentUser() {
            return this.currentUser
        },
        getAllUsers() {
            return this.users
        },
        getAllRoles() {
            return this.roles
        }
    },
    actions: {
        async fetchAllUsers() {
            try {
                const response = await fetch("http://localhost:3000/api/users", {
                    method: "GET",
                    headers: {"Content-Type": "application/json"}
                })

                if (!response.ok) {
                    throw new Error("Unable to retrieve users!")
                }

                const data = await response.json()
                
                this.users = data
            } catch (err) {
                console.error(err)
            }
        },
        async fetchAllRoles() {
            try {
                const response = await fetch("http://localhost:3000/api/roles", {
                    method: "GET",
                    headers: {"Content-Type": "application/json"}
                })

                if (!response.ok) {
                    throw new Error("Unable to retrieve users!")
                }

                const data = await response.json()
                
                this.roles = data
            } catch (err) {
                console.error(err)
            }
        },
        userIsLoggedIn() {
            return Object.keys(this.currentUser).length !== 0
        },
        setUser(user) {
            this.currentUser = user
        },
        getRoleOfUser(roleID) {
            return this.roles.find(role => { return role.id === roleID })
        },
        isUserAdmin() {
            if (this.currentUser.role === 1) {
                return true
            } else {
                return false
            }
        }
    }
})