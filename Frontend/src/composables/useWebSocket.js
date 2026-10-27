import { ref } from "vue";
import { useToast } from "./useToast";
import { useSensorStore } from "@/stores/sensors";

const socket = ref(null)
const messages = ref([])

export function useWebSocket() {
    const connect = () => {
        socket.value = new WebSocket("ws://localhost:3000")
        
        socket.value.onopen = () => {
            console.log("WebSocket connected")
        }

        socket.value.onmessage = (event) => {
            const data = JSON.parse(event.data)

            if (data.type === "sensor-readings") {
                useSensorStore().setActiveReadings(data.message)
                useSensorStore().addToHistoricalReadings(data.message)
            }

            console.log("Received:", data)
        }

        socket.value.onerror = (error) => {
            console.error("WebSocket error:", error)
            useToast().show("Error connecting to WebSocket.", "error")
        }

        socket.value.onclose = () => {
            console.log("WebSocket closed")
        }
    }

    return {
        socket, messages, connect
    }

}