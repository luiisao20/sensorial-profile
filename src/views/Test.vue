<template>
<main class="main-view p-4">
    <button @click="show">
        Hola
    </button>
    
    <div
        id="modalEl"
        tabindex="-1"
        aria-hidden="true"
        class="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0"
    >
        <ModalTest
            @hide-modal="hide"
        />
    </div>
</main>
</template>

<script setup>
import ModalTest from '@/components/ModalTest.vue';
import { Modal } from 'flowbite';
import { initFlowbite } from 'flowbite';
import { onMounted, ref } from 'vue';
/*
 * $targetEl: required
 * options: optional
 */
// set the modal menu element
const modal = ref(null)
onMounted(() => {
    const $targetEl = document.getElementById('modalEl');
    
    // options with default values
    const options = {
        placement: 'bottom-right',
        backdrop: 'dynamic',
        backdropClasses:
        'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
        closable: true,
        onHide: () => {
            console.log('modal is hidden');
        },
        onShow: () => {
            console.log('modal is shown');
        },
        onToggle: () => {
            console.log('modal has been toggled');
        },
    };
    
    // instance options object
    const instanceOptions = {
        id: 'modalEl',
        override: true
    };
    modal.value = new Modal($targetEl, options, instanceOptions);
    initFlowbite()
})

function hide() {
    modal.value.hide()
}

function show () {
    try {
        modal.value.show()
    } catch (error) {
        console.log(error);
    }
}
</script>