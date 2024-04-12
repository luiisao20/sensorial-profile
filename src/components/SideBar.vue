<template>
<button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
    <span class="sr-only">Open sidebar</span>
    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
    </svg>
</button>

<aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto bg-main dark:bg-gray-800">
        <ul class="space-y-2 font-medium">
            <RouterLink to="/home" class="flex items-center p-2 justify-start text-gray-900 rounded-lg dark:text-white transition duration-100 hover:bg-gray-200 dark:hover:bg-gray-700 group">
                <font-awesome-icon icon="fa-solid fa-file-lines" class="text-2xl w-6 text-icons transition flex-shrink duration-200 group-hover:text-gray-900"/>
                <span class="px-4">Crear nuevo registro</span>
            </RouterLink>
            <RouterLink to="/list" class="flex items-center p-2 justify-start text-gray-900 rounded-lg dark:text-white transition duration-100 hover:bg-gray-200 dark:hover:bg-gray-700 group">
                <font-awesome-icon icon="fa-solid fa-list-ol"  class="text-2xl w-6 text-icons transition flex-shrink duration-200 group-hover:text-gray-900"/>
                <span class="px-4">Listado</span>
            </RouterLink>
            <RouterLink to="/user" class="flex items-center p-2 justify-start text-gray-900 rounded-lg dark:text-white transition duration-100 hover:bg-gray-200 dark:hover:bg-gray-700 group">
                <font-awesome-icon icon="fa-solid fa-user" class="text-2xl w-6 text-icons transition flex-shrink duration-200 group-hover:text-gray-900"/>
                <span class="px-4">Perfil</span>
            </RouterLink>
            <li @click="logOut" class="flex cursor-pointer items-center p-2 justify-start text-gray-900 rounded-lg dark:text-white transition duration-100 hover:bg-gray-200 dark:hover:bg-gray-700 group">
                <font-awesome-icon icon="fa-solid fa-right-from-bracket" class="text-2xl w-6 text-icons transition flex-shrink duration-200 group-hover:text-gray-900"/>
                <span class="px-4">Cerrar sesión</span>
            </li>
        </ul>
    </div>
</aside>
</template>

<script setup>
import { getAuth, signOut } from 'firebase/auth';
import { router } from '@/router';

const auth = getAuth();
function logOut() {
    signOut(auth).then(() => {
        router.push('/');
    }).catch((error) => {
        console.log(error)
    })
}
</script>

<style scoped>
.router-link-active {
    background-color: var(--background-color);
}

</style>