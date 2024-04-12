<template>
    <Modal
        v-bind="modal"
        @close-modal="modal.showModal = false; opacity = '1'"
    />
    <div id="crud-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <ModalForm
            :patient="patientData"
            @hide-modal="hideModal"
            @send-data="saveData"
            :is-loading="isLoading.sending"
        />
    </div>
    <main class="main-view p-4" :style="{ opacity: opacity }">
        <h1 class="mb-5 text-center text-xl font-semibold">Inserte el archivo aquí</h1>
        <form @submit.prevent="setValues">
            <div class="flex items-center justify-center w-full">
                <label for="dropzone-file" class="flex flex-col text-gray-500 items-center justify-center w-64 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 transition duration-200 hover:bg-nav hover:text-white dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-8 h-8 mb-4 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p class="mb-2 text-sm dark:text-gray-400"><span class="font-semibold">Haz click para subir el arcivo</span></p>
                        <p class="text-xs dark:text-gray-400">Sólo formato excel</p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" accept=".xlsx,xls" @change="subirExcel($event.target.files[0])" />
                </label>
            </div>
            <h1 class="pl-4">{{ fileName }}</h1>
            <button type="submit" :class="{ 'bg-icons': fileName.length === 0 }" :disabled="fileName.length === 0" class="bg-nav text-white px-4 py-2 rounded-xl transition duration-100 shadow-lg hover:shadow-indigo-500/40  my-4">
                Cargar info
            </button>
        </form>
        <div>
            <Profile
                :data="data"
            />
            <div class="text-end my-5" v-if="showSubmit">
                <button @click="modalFor.show()" class="bg-nav text-white py-2 px-4 rounded-xl transition duration-100 shadow-lg hover:shadow-indigo-500/40" type="button">
                    Guardar información
                </button>
            </div>
        </div>
    </main>
</template>

<script setup>
import readXlsxFile from 'read-excel-file';
import { reactive, ref, onMounted, onBeforeMount } from 'vue';
import Modal from '@/components/Modal.vue';
import Profile from '@/components/Profile.vue';
import { useModal } from '@/composables/modal.js';
import ModalForm from '@/components/ModalForm.vue';
import { initFlowbite, Modal as ModalFlow } from 'flowbite';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '@/main';
import { formatDate } from '@/composables/formatDate';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { router } from '@/router';

const patientData = reactive({
    id: '',
    sex: '',
    process: '',
    birthday: '',
})
const fileName = ref('');
const { modal, opacity, showModal } = useModal();
const modalFor = ref(null);
const isLoading = reactive({
    sending: false
})
const data = ref([]);
const auth = getAuth();
const email = ref('');
const showSubmit = ref(false);

onMounted(() => {
    const target = document.getElementById('crud-modal');
    const instanceOptions = {
        id: 'crud-modal',
        override: true
    };
    modalFor.value = new ModalFlow(target, instanceOptions);
    initFlowbite();
})

onBeforeMount(() => {
    onAuthStateChanged(auth, (user) => {
        if (!user) router.push('/');
        else email.value = user.email;
    })
})

function hideModal() {
    modalFor.value.hide();
}

function subirExcel(file) {
    const inputFile = document.getElementById('dropzone-file');
    fileName.value = file.name;

    readXlsxFile(inputFile.files[0]).then((rows) => {
        localStorage.setItem('excel-values', JSON.stringify(rows));
    })
}

async function saveData () {
    isLoading.sending = true;
    patientData.birthday = formatDate(patientData.birthday);
    try {
        const docRef = await addDoc(collection(db, 'profiles'), {
            patientData,
            data: data.value,
            date: formatDate(new Date()),
            owner: email.value
        })
        modalFor.value.hide();
        showModal('¡Registro exitoso!', false, { variant: 'success' });
    } catch (error) {
        showModal(error.message, false, { variant: 'danger' });
    }
    isLoading.sending = false;
}

function setValues() {
    const object = JSON.parse(localStorage.getItem('excel-values'));
    if (fileName.value.length === 0) {
        showModal('Ocurrió un error, vuelve a subir el archivo', false, { variant: 'danger' });
        return
    }
    try {        
        data.value = {
            'Búsqueda [Buscador]': object[21][1],
            'Evitación [Evitativo]': object[22][3],
            'Sensibilidad [Sensitivo]': object[21][5],
            'Registro [Espectador]': object[24][7],
            'Auditivo': object[28][3],
            'Visual': object[29][3],
            'Táctil': object[30][3],
            'Movimiento': object[31][3],
            'Corporal': object[32][3],
            'Oral': object[33][3],
            'Conductual': object[34][3],
            'Socioemocional': object[35][3],
            'Atencional': object[36][3],
        }
    } catch (error) {
        showModal('Ocurrió un error, vuelve a subir el archivo', false, { variant: 'danger' });
    }
    showSubmit.value = true;
}

</script>