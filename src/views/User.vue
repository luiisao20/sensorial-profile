<template>
    <Modal
        v-bind="modal"
        @close-modal="modal.showModal = false; opacity = '1'"
        :is-loading="isLoading.password"
        @send-data="changePassword"
    />
    <main :style="{ opacity: opacity }" v-if="!isLoading.data" class="main-view p-4">
        <section class="bg-white p-4 rounded-xl md:w-4/5 mx-auto">
            <h1 class="text-xl font-semibold">Bienvenido /a: <span class="font-normal">{{ main.data.firstName }} {{ main.data.lastName }}</span> </h1>
            <p class="text-xl p-4">Mantén tu cuenta segura y protegida mediante la gestión de tu contraseña. Cambia tu contraseña regularmente para garantizar la seguridad de tus datos.</p>
            <p class="text-lg font-normal px-4">
                La contraseña debe tener mínimo 8 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial: (= >?:;'{}).
            </p>
            <form @submit.prevent="checkPass" class="space-y-4 md:space-y-6 w-1/2 mx-auto my-4" action="#">
                <div>
                    <label for="password" class="block mb-2 font-medium text-gray-900 dark:text-white">Nueva Contraseña</label>
                    <PasswordInput v-model:password="main.password" name="password" />
                </div>
                <div>
                    <label for="confirm-password" class="block mb-2 font-medium text-gray-900 dark:text-white">Repetir contraseña</label>
                    <PasswordInput name="confirm-password" v-model:password="main.confirmPassword" />
                </div>
                <div class="text-center">
                    <button type="submit" :disabled="isLoading.password" class="w-1/2 text-white bg-nav focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Cambiar contraseña
                    </button>
                </div>
            </form>
        </section>
    </main>
</template>

<script setup>
import { onBeforeMount, reactive } from 'vue';
import { getAuth, onAuthStateChanged, updatePassword } from 'firebase/auth';
import { router } from '@/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/main';
import PasswordInput from '@/components/PasswordInput.vue';
import Modal from '@/components/Modal.vue';
import { useModal } from '@/composables/modal.js';

const auth = getAuth();
const main = reactive({
    email: '', data: {},
    password: '', confirmPassword: '',
    user: null
})
const isLoading = reactive({
    data: false, password: false
})
const checkPassword = "^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[= >?:;'{}%]).{8,}$";
const { modal, opacity, showModal } = useModal();

onBeforeMount(() => {
    isLoading.data = true;
    onAuthStateChanged(auth, async(user) => {
        if(user) {
            const userRef = doc(db, 'users', user.email);
            const docSnap = await getDoc(userRef);

            if(docSnap.exists()) {
                main.email = user.email;
                main.data = docSnap.data();
                main.user = user;
            }
        } else router.push('/');
        isLoading.data = false;
    })
})

function checkPass() {
    if (! new RegExp(checkPassword).test(main.password) || main.password !== main.confirmPassword) {
        showModal('La contraseña no cumple con los parámetros establecidos', false, { variant: 'danger' });
    } else {
        showModal('¿Estás seguro de cambiar la contraseña?', true, { variant: 'info' });
    }
}

function changePassword() {
    isLoading.password = true;
    updatePassword(main.user, main.password).then(() => {
        showModal('¡Contraseña cambiada con éxito!', false, { variant: 'success' });
    }).catch((error) => {
        showModal(error.message, false, { variant: 'danger' })
    }).finally(() => isLoading.password = false);
}

</script>