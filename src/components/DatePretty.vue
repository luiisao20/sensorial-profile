<template>
    <input @input="inputDate(date)" v-model="date" type="text" maxlength="10" name="floating_birth_place" id="floating_birth_place"
        class="block py-2.5 px-2 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-xl dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-default peer"
        />
        <span class="text-sm absolute pointer-events-none translate-x-2 -translate-y-[151%]">{{ formatDateNew }}</span>
</template>

<script setup>
import { ref } from 'vue';

const formatDate = ref('mm/dd/aaaa');
const formatDateNew = ref('mm/dd/aaaa');
const previous = ref(0);
const date = ref('');
const emit = defineEmits(['updateDate']);

function updateDate(date){
    emit('updateDate', date);
}

function inputDate(){
    formatDateNew.value = date.value + formatDate.value.substring(date.value.length);
    if ((date.value.length === 2 || date.value.length === 5) && date.value.length > previous.value){
        date.value += '/';
    }
    previous.value = date.value.length;
    updateDate(date.value);
}
</script>