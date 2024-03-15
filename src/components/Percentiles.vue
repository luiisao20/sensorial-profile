<template>
    <div class="relative overflow-x-auto sm:rounded-lg w-3/4 mx-auto">
        <table class="w-full mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        {{ tableTitle }}
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Puntuación directa
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Rango percentil
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Clasificación
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in array" :key="index" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ item.title }}
                    </th>
                    <td class="px-6 py-4 text-center">
                        {{ objectData[item.title] }}
                    </td>
                    <td class="px-6 py-4 text-center">
                        {{ item.percentiles[interpretaciones[item.title].index] }}
                    </td>
                    <td class="px-6 py-4">
                        {{ comparaciones[interpretaciones[item.title].index] }}
                    </td>
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
    interpretaciones: {
        required: true, type: Object
    },
    tableTitle: {
        required: true, type: String
    },
})
</script>