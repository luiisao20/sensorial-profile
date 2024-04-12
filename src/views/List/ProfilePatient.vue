<template>
    <div class="md:w-1/4 bg-white mx-auto rounded-xl mb-4 p-4 flex flex-col gap-2 shadow-md shadow-nav">
        <div class="bg-nav w-[50px] rounded-full h-[50px] flex justify-center items-center mx-auto">
            <font-awesome-icon v-if="info.data().patientData.sex === '0'" icon="fa-solid fa-venus" class="text-white text-[2rem]" />
            <font-awesome-icon v-else icon="fa-solid fa-mars" class="text-white text-[2rem]" />
        </div>
        <h1 class="text-xl text-center font-semibold">{{ info.data().patientData.id }}</h1>
        <h1 class="text-base text-center">Informe N°: {{ info.data().patientData.process }}</h1>
        <p class="flex items-center justify-center gap-2 text-gray-400">
            <font-awesome-icon icon="fa-solid fa-cake-candles" class="text-xl" />
            <span>{{ info.data().patientData.birthday }}</span>
        </p>
        <p class="flex items-center justify-center gap-2 text-gray-400">
            <font-awesome-icon icon="fa-solid fa-pen-to-square" class="text-xl"/>
            <span>{{ info.data().date }}</span>
        </p>
    </div>
    <Profile :data="info.data().data" />
    <div class="text-end mt-4 pr-[9.2rem]">
        <button @click="emit('deleteItem', id)" :class="{ 'cursor-progress': isLoading }" class="bg-danger text-white px-4 py-2 rounded-xl shadow-md">Eliminar Registro</button>
    </div>
</template>

<script setup>
import Profile from '@/components/Profile.vue';

const props = defineProps({
    id: {
        required: true,
        type: String
    },
    info: {
        required: true,
        type: Object
    },
    isLoading: {
        required: true,
        type: Boolean
    }
})
const emit = defineEmits(['deleteItem'])

</script>