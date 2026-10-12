<template>
    <div id="toaster">
        <TransitionGroup name="toast" appear>
            <div id="toast" v-for="toast in toastQueue" :key="toast.id" :class="toast.type">
                <Icon :icon="toast.type" size="18px" :color="getIconColor(toast.type)" class="icon"/>
                <p>{{ toast.message }}</p>
                <Icon icon="x" @click="() => closeToast(toast.id)" size="22px" :color="getIconColor(toast.type)" class="close"/>
            </div>
        </TransitionGroup>
    </div>
</template>

<script>
import { TransitionGroup } from 'vue';
import Icon from '@/components/Icon.vue';

import { useToast } from '@/composables/useToast';

export default {
    name: "Toaster",
    components: {Icon},
    data() {
        return {
            toastQueue: useToast().toastQueue
        }
    },
    methods: {
        getIconColor(toastType) {
            if (toastType == "info") { return "var(--blue-900)" }
            if (toastType == "success") { return "var(--green-900)" }
            if (toastType == "error") { return "var(--red-900)" }
            if (toastType == "warning") { return "var(--orange-900)" }
            return "black"
        },
        closeToast(toastID) {
            useToast().dismiss(toastID)   
        }
    }
}
</script>

<style scoped>
#toaster {
    width: calc(100vw - 50px);
    height: calc(100vh - 50px);
    pointer-events: none;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 25px;
    gap: 10px;
    overflow: hidden;
}

#toast {
    width: fit-content;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    pointer-events: none;
    border-radius: 5px;
    animation: fadeIn 0.25s ease-in-out 0s forwards;
    gap: 10px;
    position: relative;
    pointer-events: all;
    z-index: 10000000;
}

.error { background-color: var(--red-300); border: solid 3px var(--red-400) }
.error > p { color: var(--red-900); }

.warning { background-color: var(--yellow-200); border: solid 3px var(--yellow-400) }
.warning > p { color: var(--yellow-900); }

.info { background-color: var(--blue-300); border: solid 3px var(--blue-400) }
.info > p { color: var(--blue-900); }

.success { background-color: var(--green-300); border: solid 3px var(--green-500) }
.success > p { color: var(--green-900); }

.close { cursor: pointer; }

.toast-move,
.toast-enter-active,
.toast-leave-active {
    transition: all 0.25s ease;
}

.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

</style>