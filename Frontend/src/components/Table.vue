<template>
    <div id="table">
        <div id="header">
        </div>
        <div id="body">
            <TableRow v-for="sensor in sensors" :id="sensor.id" :name="sensor.name" />
        </div>
    </div>
</template>

<script>
import TableRow from './TableRow.vue';

export default {
    name: "Table",
    props: [],
    components: {TableRow},
    data() {
        return {
            sensors: []    
        }
    },
    methods: {
        async getSensors() {
            try {
                const response = await fetch("http://localhost:3000/api/sensors", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

                if (!response.ok) {
                    throw new Error("Unable to retrieve sensors!")
                }

                // console.log(response)
                const data = await response.json()
                
                return data
            } catch (err) {
                console.error(err)
            }
        }
    },
    async mounted() {
        this.sensors = await this.getSensors()
        console.log(this.sensors)
    }
}
</script>

<style>
#table {
    width: 100%;
    height: 82.5vh;
}

#header {
    width: 100%;
    height: 50px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: red;
}

#body {
    width: 100%;
    height: calc(82.5vh - 50px);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    overflow-y: scroll;
}
</style>