<template>
    <component :is="iconComponent" :size="size || '12px'" :color="color || 'black'"/>
</template>

<script>
import {
    LayoutGrid,
    Radio,
    ChartColumnIncreasing,
    UserRound,
    Thermometer,
    Activity,
    MapPin,
    RadioTower,
    ChevronDown,
    ChevronUp,
    CircleAlert,
    Info,
    TriangleAlert,
    CircleCheck,
    X,
    LogOut,
    Trash,
    SquarePen,
    Eye,
    Plus,
    UserRoundCog,
    UserRoundGroup
} from "@lucide/vue";

export default {
    name: "Icon",
    props: ["icon", "size", "color"],
    data() {
        return {
            icons: {
                "layout-grid": LayoutGrid,
                "radio": Radio,
                "chart": ChartColumnIncreasing,
                "user": UserRound,
                "log-out": LogOut,
                "thermometer": Thermometer,
                "activity": Activity,
                "map-pin": MapPin,
                "radio-tower": RadioTower,
                "chevron-down": ChevronDown,
                "chevron-up": ChevronUp,
                "error": CircleAlert,
                "info": Info,
                "warning": TriangleAlert,
                "success": CircleCheck,
                "x": X,
                "delete": Trash,
                "edit": SquarePen,
                "view": Eye,
                "plus": Plus,
                "role": UserRoundCog,
                "users": UserRoundGroup
            }
        }
    },
    computed: {
        iconComponent() {
            return this.icons[this.icon]
        }
    }
}
</script>

<style scoped>
</style>