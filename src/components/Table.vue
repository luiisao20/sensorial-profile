<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-3 py-3">
                        {{ tableTitle }}
                    </th>
                    <th v-for="(item, index) in comparaciones" :key="index" scope="col" class="px-6 py-3 text-center">
                        {{ item }}
                    </th>
                    <th scope="col" class="px-3 py-3">
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in array" :key="index" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ item.title }}
                    </th>
                    <td v-if="showCuadrantes" v-for="(range, subindex) in item.ranges" :key="subindex" class="px-3 py-6 text-center relative">
                        {{ range }}
                        <div v-if="objectData[item.title] >= parseInt(range.split(' --- ')[0]) && objectData[item.title] <= parseInt(range.split(' --- ')[1])" class="absolute -translate-x-1/2 left-1/2">
                            <font-awesome-icon :icon="['fas', 'location-pin']" class="text-success text-lg"/>
                        </div>
                    </td>
                    <td v-else v-for="(range, subindex) in item.ranges" class="px-3 py-6 text-center relative">
                        {{ range }}
                        <div v-if="objectData[`${item.title}`] >= parseInt(range.split(' --- ')[0]) && objectData[`${item.title}`] <= parseInt(range.split(' --- ')[1])" class="absolute -translate-x-1/2 left-1/2">
                            <font-awesome-icon :icon="['fas', 'location-pin']" class="text-success text-lg"/>
                        </div>
                        <div v-else-if="objectData[`${item.title}`] === 0 && subindex === 0" class="absolute -translate-x-1/2 left-1/2">
                            <font-awesome-icon :icon="['fas', 'location-pin']" class="text-success text-lg"/>
                        </div>
                    </td>
                    <th scope="row" class="px-3 py-4 w-48 font-medium text-gray-900 whitespace-wrap dark:text-white">
                        <span v-if="Object.keys(comments).length > 0">
                            {{ comments[item.title].comment }}
                        </span>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>

const props = defineProps({
    array: {
        required: true, type: Array
    },
    objectData: {
        required: true, type: Object
    },
    comparaciones: {
        required: true, type: Array
    },
    tableTitle: {
        required: true, type: String
    },
    showCuadrantes: {
        default: true, type: Boolean
    },
    comments: {
        required: true, type: Object
    },
})
</script>