<template>
    <Modal
        v-bind="modal"
        @close-modal="modal.showModal = false; opacity = '1'"
        :is-loading="isLoading.delete"
        @send-data="if(!deleteSeveralItems) deleteItem(); else deleteSeveral()"
    />
    <main class="main-view" :style="{ opacity: opacity }">
        <section v-if="list" class="md:w-3/4 mx-auto">
            <h1 class="text-center my-4 text-xl font-semibold">Listado de perfiles sensoriales</h1>
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative w-full my-4">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input @input="filterData" v-model="search" type="search" id="default-search-id" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Busca por apellidos y nombres">
            </div>
            <div v-if="!isLoading.data">
                <div v-if="patientsFiltred.length > 0">
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="p-4">
                                        <div class="flex items-center">
                                            <input v-model="allDelete" @change="checkAllItems($event.target.checked)" id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                            <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                        </div>
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        <div class="flex items-center">
                                            Nombre
                                            <a href="#" @click="orderItems('id')"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        <div class="flex items-center">
                                            Fecha de creación
                                            <a @click="orderItems('date')" href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        <div class="flex items-center">
                                            Fecha de nacimiento
                                            <a @click="orderItems('birthday')" href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Género
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Proceso
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Acción
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in patientsFiltred" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td class="w-4 p-4">
                                        <div class="flex items-center">
                                            <input v-model="itemsToDelete[item.id]" :id="`checkbox-table-search-${index}`" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                            <label :for="`checkbox-table-search-${index}`" class="sr-only">checkbox</label>
                                        </div>
                                    </td>
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {{ item.data().patientData.id }}
                                    </th>
                                    <td class="px-6 py-4">
                                        {{ item.data().date }}
                                    </td>
                                    <td class="px-6 py-4">
                                        {{ item.data().patientData.birthday }}
                                    </td>
                                    <td class="px-6 py-4">
                                        <span v-if="item.data().patientData.sex === '0'">Varón</span>
                                        <span v-else>Mujer</span>
                                    </td>
                                    <td class="px-6 py-4">
                                        {{ item.data().patientData.process }}
                                    </td>
                                    <td class="flex items-center px-6 py-4">
                                        <a @click="router.push(`list/${item.id}`); list = false; selectedItem = item" href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            Ir
                                        </a>
                                        <a @click="askDelete(item.id)" href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">
                                            Eliminar
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="text-end">
                        <button :disabled="isLoading.delete" :class="{ 'cursor-progress': isLoading.delete }" 
                            @click="askToDeleteSeveral" 
                            class="bg-danger text-white px-4 py-2 rounded-xl my-4">Borrar varios</button>
                    </div>
                </div>
                <div v-else>
                    <h1 class="text-center font-semibold">No hay pacientes registrados</h1>
                </div>
            </div>
            <Skeleton v-else />
        </section>
        <section v-else>
            <button class="bg-nav text-white px-4 py-2 rounded-xl shadow-md" @click="list = true; router.push('/list')">Regresar</button>
            <RouterView :info="selectedItem" @delete-item="askDelete" :is-loading="isLoading.delete" />
        </section>
    </main>
</template>

<script setup>
import { onBeforeMount, ref, reactive } from 'vue';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { router } from '@/router';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/main';
import { orderByBirthday, orderByName, orderByCreatedAt } from '@/composables/orderByDate'
import { RouterView } from 'vue-router';
import Modal from '@/components/Modal.vue';
import { useModal } from '@/composables/modal.js';
import Skeleton from '@/components/Skeleton.vue';

const auth = getAuth();
const email = ref('');
const patients = ref([]);
const patientsFiltred = ref([]);
const isLoading = reactive({
    data: false, delete: false
});
const list = ref(true);
const selectedItem = ref({});
const { modal, opacity, showModal } = useModal();
const idToDelete = ref ('');
const search = ref ('');
const itemsToDelete = ref({});
const allDelete = ref(false);
const deleteSeveralItems = ref(false);

onBeforeMount(() => {
    isLoading.data = true;
    onAuthStateChanged(auth, async(user) => {
        if(!user) router.push('/');
        else {
            email.value = user.email;
            await getPatients()
        }
        isLoading.data = false;
    })
})

function checkAllItems(value) {
    for (const key in itemsToDelete.value) itemsToDelete.value[key] = value;
}

function askToDeleteSeveral() {
    for (const key in itemsToDelete.value) {
        const value = itemsToDelete.value[key];
        if(value) {
            deleteSeveralItems.value = true;
            return showModal('¿Estás seguro de eliminar el/los registro(s)? Esta acción no se puede deshacer', true, { variant: 'danger' });
        }
    }

}

function filterData() {
    patientsFiltred.value = patients.value.filter(patient => 
        patient.data().patientData.id.toString().toLowerCase().includes(search.value.toLowerCase())
    );
}

async function deleteSeveral() {
    for (const key in itemsToDelete.value) {
        const value = itemsToDelete.value[key];
        if (value) {
            idToDelete.value = key;
            await deleteItem(true);
            delete itemsToDelete.value[key];
        }
    }
    showModal('¡El/Los registro(s) se ha(n) borrado con éxito!', false, { variant: 'success' });

}

function askDelete(id) {
    deleteSeveralItems.value = false;
    showModal('¿Estás seguro de eliminar el registro? Esta acción no se puede deshacer', true, { variant: 'danger' });
    idToDelete.value = id;
}

function orderItems(word) {
    if (word === 'id') patientsFiltred.value = orderByName(patients.value);
    else if (word === 'birthday') patientsFiltred.value = orderByBirthday(patients.value);
    else patientsFiltred.value = orderByCreatedAt(patients.value);
}

async function getPatients() {
    const patientsRef = collection(db, 'profiles');
    const q = query(patientsRef, where('owner', '==', email.value));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        patients.value.push(doc);
        itemsToDelete.value[doc.id] = false;
    });
    patientsFiltred.value = [...patients.value];
    console.log(patientsFiltred.value.length);
}

async function deleteItem(route) {
    isLoading.delete = true;
    const index = patients.value.findIndex(value => value.id === idToDelete.value);
    patientsFiltred.value.splice(index, 1);
    patients.value.splice(index, 1);
    await deleteDoc(doc(db, 'profiles', idToDelete.value));
    if(!route) {
        showModal('¡El registro se ha borrado con éxito!', false, { variant: 'success' });
        router.push('/list');
        list.value = true;
    }
    isLoading.delete = false;
}
</script>