import { reactive } from 'vue';

const toastQueue = reactive([])

export function useToast() {
    const show = (text, toastType = "info", duration = 5000) => {
        const id = crypto.randomUUID()
        
        const toast = {
            id,
            message: text,
            type: toastType,
            duration: duration,
            timeout: null
        }

        toast.timeout = setTimeout(() => {
            const index = toastQueue.findIndex(toast => toast.id === id)

            if (index !== -1) {
                toastQueue.splice(index, 1)
            }
        }, duration)

        toastQueue.push(toast)
    }

    const dismiss = (id) => {
        const index = toastQueue.findIndex(toast => toast.id === id)

        if (index !== -1) {
            clearTimeout(toastQueue[index].timeout)
            toastQueue.splice(index, 1)
        }
    }

    return {
        toastQueue,
        show,
        dismiss
    }
}