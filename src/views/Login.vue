<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                Perfil Sensorial
            </a>
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Ingresa a tu cuenta
                    </h1>
                    <form @submit.prevent="login" class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
                            <input v-model="user.email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                            <PasswordInput
                                v-model:password="user.password"
                            />
                        </div>
                        <div class="flex items-center justify-between">
                            <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">¿Olvidaste tu contraseña?</a>
                        </div>
                        <button :disabled="isLoading" type="submit" :class="{ 'cursor-progress': isLoading }" class="w-full text-white bg-nav hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Ingresar</button>
                        <p v-if="error.show" class="text-xs text-danger dark:text-green-500"><span class="font-medium">¡Ups!</span> {{ error.text }} </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { reactive, ref } from 'vue';
import PasswordInput from '@/components/PasswordInput.vue';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { router } from '../router';

const user = reactive({
    email: '', password: ''
})
const userSigned = ref({});
const error = reactive({
    show: false, text: ''
})
const isLoading = ref(false);
const auth = getAuth();

function login() {
    isLoading.value = true;
    signInWithEmailAndPassword(auth, user.email, user.password).then((userCredential) => {
        userSigned.value = userCredential.user;
        router.push('/home');
    }).catch((er) => {
        error.show = true;
        error.text = `El correo o la contraseña están incorrectos: ${er.message}`;
    }).finally(() => {
        isLoading.value = false;
    })
}

</script>