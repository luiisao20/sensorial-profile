<template>
<!-- Main modal -->
    <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Crear un nuevo registro
                </h3>
                <button type="button" @click="emit('hideModal')" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg aria-hidden="true" class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <p v-if="alert.show === 'consulting' && alert.value === true" class="text-danger text-base dark:text-green-500 px-4 py-2"><span class="font-medium">¡Ups!</span> {{ alert.text }} </p>
            <form @submit.prevent="checkValues" class="p-4 md:p-5">
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="md:col-span-2">
                        <label for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombres</label>
                        <input v-model="patient.id" type="text" name="id" id="id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="1234567890" >
                        <p v-if="alert.show === 'id' && alert.value === true" class="text-xs text-danger dark:text-green-500"><span class="font-medium">¡Ups!</span> {{ alert.text }} </p>
                    </div>
                    <div class="md:col-span-2">
                        <label for="process" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Informe N°</label>
                        <input type="number" v-model="patient.process" name="process" id="process" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="01">
                        <p v-if="alert.show === 'process' && alert.value === true" class="text-xs text-danger dark:text-green-500"><span class="font-medium">¡Ups!</span> {{ alert.text }} </p>
                    </div>
                    <div class="col-span-2">
                        <label for="sex" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sexo</label>
                        <select id="sex" v-model="patient.sex" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" >
                            <option disabled selected value="">Selecciona el género</option>
                            <option value="0">Varón</option>
                            <option value="1">Mujer</option>
                        </select>
                        <p v-if="alert.show === 'sex' && alert.value === true" class="text-xs text-danger dark:text-green-500"><span class="font-medium">¡Ups!</span> {{ alert.text }} </p>
                    </div>
                    <div class="col-span-2">
                        <label for="birthday" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de nacimiento</label>

                        <DatePretty
                            @update-date="updateDate"
                        />
                        <p v-if="alert.show === 'birthday' && alert.value === true" class="text-xs text-danger dark:text-green-500"><span class="font-medium">¡Ups!</span> {{ alert.text }} </p>
                    </div>
                </div>
                <button v-if="!(isLoading || isConsulting)" type="submit" class="text-white inline-flex items-center bg-nav transition duration-200 hover:text-gray-500 hover:bg-nav/50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Guardar
                </button>
                <button v-else disabled type="button" class="text-white bg-nav hover:bg-nav/50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                    <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                    </svg>
                    Cargando...
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import DatePretty from './DatePretty.vue';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '@/main';

const props = defineProps({
    patient: {
        required: true, type: Object
    },
    isLoading: {
        required: true, type: Boolean
    }
})
const emit = defineEmits(['hideModal', 'sendData']);
const alert = reactive({
    show: '', text: 'Existe un error en este campo',
    value: false,
})
const isConsulting = ref(false);

function updateDate(date) {
    props.patient.birthday = date;
}

async function checkValues() {
    const regexProcess = /^\d+$/;
    alert.show = '';
    alert.value = false;
    isConsulting.value = true;

    for (const key in props.patient) {
        const item = props.patient[key];
        if(key === 'id' && (item.toString().trim().length < 10)) {
            alert.show = key;
            alert.text = 'Este campo no puede estar vacío, y debe tener como mínimo 10 caracteres';
            break
        } else if (key === 'process' && (item.length === 0 || !regexProcess.test(item))) {
            alert.text = 'Este campo no puede estar vacío';
            alert.show = key;
            break
        } else if (key === 'sex' && item.toString().trim() === '') {
            alert.text = 'Debes escoger el género';
            alert.show = key;
            break
        } else if (key === 'birthday' && item.length === 0) {
            alert.show = key;
            break 
        }
    }

    const patientsRef = collection(db, 'profiles');
    const q = query(patientsRef, where('patientData.id', '==', props.patient.id), where('patientData.process', '==', props.patient.process));
    const querySnapshot = await getDocs(q);

    console.log(querySnapshot.docs.length);
    isConsulting.value = false;
    if (alert.show !== '') {
        alert.value = true;
    } else if (querySnapshot.docs.length > 0) {
        alert.text = 'Ya existe un registro con este nombre y este proceso, ¡modifica los datos!';
        alert.show = 'consulting';
        alert.value = true;
    } else {
        alert.value = false;
        emit('sendData');
    }

}
</script>