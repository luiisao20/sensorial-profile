import { reactive, ref } from 'vue';

function useModal () {
    const modal = reactive({
        showModal: false,
        title: '',
        modalType: 'info',
        showSubmit: true
    })

    const opacity = ref('1');

    const showModal = (title, submit, options = { variant: 'light' }) => {
        modal.showModal = true;
        modal.title = title;
        modal.modalType = options.variant;
        modal.showSubmit = submit;
        opacity.value = '0.2';
    }
    return {
        modal,
        opacity,
        showModal
    }
}

export { useModal }