<template>
    <Modal
        v-bind="modal"
        @close-modal="modal.showModal = false; opacity = '1'"
    />
    <main class="main-view p-4" :style="{ opacity: opacity }">
        <h1>Inserte el archivo aquí</h1>
        <form @submit.prevent="setValues">
            <div class="flex items-center justify-center w-full">
                <label for="dropzone-file" class="flex flex-col items-center justify-center w-64 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Haz click para subir el arcivo</span></p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Sólo formato excel</p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" accept=".xlsx,xls" @change="subirExcel($event.target.files[0])" />
                </label>
            </div>
            <h1 class="pl-4">{{ fileName }}</h1>
            <button type="submit" class="bg-nav text-white px-4 py-2 rounded-xl transition duration-100 shadow-lg hover:shadow-indigo-500/40  my-4">
                Cargar info
            </button>
        </form>
        <h1 class="mb-5 text-center text-xl font-semibold">Perfil de puntuaciones</h1>
        <Table
            class="my-4"
            :array="cuadrantes"
            :object-data="objectData"
            :comparaciones="comparaciones"
            table-title="Cuadrantes"
            :comments="interpretaciones"
        />

        <Table
            :array="sensoriales"
            :object-data="objectData"
            :comparaciones="comparaciones"
            table-title="Secciones sensoriales"
            :show-cuadrantes="false"
            :comments="interpretaciones"
        />

        <Table
            :array="conductuales"
            :object-data="objectData"
            :comparaciones="comparaciones"
            table-title="Secciones conductuales"
            :show-cuadrantes="false"
            :comments="interpretaciones"
        />

        <section v-if="Object.keys(interpretaciones).length > 0">
            <h1 class="mt-10 mb-5 text-center text-xl font-semibold">Resumen de las puntuaciones de los cuadrantes</h1>
            <Percentiles
                table-title="Cuadrantes"
                :array="cuadrantes"
                :object-data="objectData"
                :comparaciones="comparaciones"
                :interpretaciones="interpretaciones"
            />
            <h1 class="my-5 text-center text-xl font-semibold">Resumen de las puntuaciones de las secciones sensoriales y conductuales</h1>
            <Percentiles
                table-title="Secciones sensoriales"
                :array="sensoriales"
                :object-data="objectData"
                :comparaciones="comparaciones"
                :interpretaciones="interpretaciones"
            />
    
            <Percentiles
                table-title="Secciones conductuales"
                :array="conductuales"
                :object-data="objectData"
                :comparaciones="comparaciones"
                :interpretaciones="interpretaciones"
            />
        </section>

    
    </main>
</template>

<script setup>
import { initFlowbite } from 'flowbite';
import readXlsxFile from 'read-excel-file';
import { onBeforeMount, onMounted, ref } from 'vue';
import Table from '@/components/Table.vue';
import Modal from '@/components/Modal.vue';
import { useModal } from '@/composables/modal.js';
import Percentiles from '@/components/Percentiles.vue';

const objectData = ref({});
const cuadrantes = [
    {
        title: 'Búsqueda [Buscador]',
        ranges: [
            '0 --- 8',
            '9 --- 20',
            '21 --- 46',
            '47 --- 59',
            '60 --- 95'
        ],
        percentiles: [
            '≤ 1', 
            '2 --- 9',
            '10 --- 82',
            '83 --- 96',
            '≥ 97'
        ]
    },
    {
        title: 'Evitación [Evitativo]',
        ranges: [
            '0 --- 10',
            '11 --- 20',
            '21 --- 42',
            '43 --- 53',
            '54 --- 100'
        ],
        percentiles: [
            '≤ 1', 
            '2 --- 6',
            '7 --- 84',
            '85 --- 96',
            '≥ 97'
        ]
    },
    {
        title: 'Sensibilidad [Sensitivo]',
        ranges: [
            '0 --- 8',
            '9 --- 18',
            '19 --- 40',
            '41 --- 50',
            '51 --- 95'
        ],
        percentiles: [
            '≤ 1', 
            '2 --- 5',
            '6 --- 83',
            '84 --- 95',
            '≥ 96'
        ]
    },
    {
        title: 'Registro [Espectador]',
        ranges: [
            '0 --- 8',
            '9 --- 18',
            '19 --- 39',
            '40 --- 49',
            '50 --- 110'
        ],
        percentiles: [
            '≤ 2', 
            '3 --- 6',
            '7 --- 86',
            '87 --- 96',
            '≥ 97'
        ]
    }
]
const sensoriales = [
    {
        title: 'Auditivo',
        ranges: [
            '0 --- 2',
            '3 --- 9',
            '10 --- 22',
            '23 --- 29',
            '30 --- 40'
        ],
        percentiles: [
            '< 1',
            '1 --- 14',
            '15 --- 80',
            '81 --- 97',
            '≥ 98'
        ]
    },
    {
        title: 'Visual',
        ranges: [
            '0 --- 2',
            '3 --- 6',
            '7 --- 16',
            '17 --- 20',
            '21 --- 30'
        ],
        percentiles: [
            '≤ 1',
            '2 --- 7',
            '8 --- 86',
            '87 --- 99',
            '> 99'
        ]
    },
    {
        title: 'Táctil',
        ranges: [
            '0 --- 2',
            '3 --- 8',
            '9 --- 20',
            '21 --- 26',
            '27 --- 55'
        ],
        percentiles: [
            '≤ 2',
            '3 --- 7',
            '8 --- 86',
            '87 --- 95',
            '≥ 96'
        ]
    },
    {
        title: 'Movimiento',
        ranges: [
            '0 --- 2',
            '3 --- 7',
            '8 --- 18',
            '19 --- 23',
            '24 --- 40'
        ],
        percentiles: [
            '≤ 1',
            '2 --- 5',
            '6 --- 82',
            '83 --- 96',
            '≥ 97'
        ]
    },
    {
        title: 'Corporal',
        ranges: [
            '0',
            '1 --- 4',
            '5 --- 14',
            '15 --- 18',
            '19 --- 40'
        ],
        percentiles: [
            '≤ 1',
            '2 --- 7',
            '8 --- 89',
            '90 --- 95',
            '≥ 96'
        ]
    },
    {
        title: 'Oral',
        ranges: [
            '0',
            '1 --- 8',
            '9 --- 24',
            '25 --- 32',
            '33 --- 50'
        ],
        percentiles: [
            '< 1',
            '1 --- 5',
            '6 --- 86',
            '87 --- 94',
            '≥ 95'
        ]
    },
]
const conductuales = [
    {
        title: 'Conductual',
        ranges: [
            '0 --- 2',
            '3 --- 7',
            '8 --- 19',
            '20 --- 24',
            '25 --- 45'
        ],
        percentiles: [
            '≤ 1',
            '2 --- 4',
            '5 --- 85',
            '86 --- 95',
            '≥  96'
        ]
    },
    {
        title: 'Socioemocional',
        ranges: [
            '0 --- 3',
            '4 --- 12',
            '13 --- 30',
            '31 --- 38',
            '39 --- 70'
        ],
        percentiles: [
            '≤ 1',
            '2 --- 5',
            '6 --- 87',
            '88 --- 94',
            '≥  95'
        ]
    },
    {
        title: 'Atencional',
        ranges: [
            '0 --- 2',
            '3 --- 9',
            '10 --- 23',
            '24 --- 30',
            '31 --- 50'
        ],
        percentiles: [
            '≤ 1',
            '2 --- 9',
            '10 --- 85',
            '86 --- 95',
            '≥  96'
        ]
    },
]
const comparaciones = [
    'Mucho menos que los demás',
    'Menos que los demás',
    'Como los demás',
    'Más que los demás',
    'Mucho más que los demás',
]
const fileName = ref('');
const { modal, opacity, showModal } = useModal();
const interpretaciones = ref({});
const interpretations = {
    'Búsqueda [Buscador]': 'Está interesado en las experiencias sensoriales ',
    'Evitación [Evitativo]': 'Le molestan las experiencias sensoriales ',
    'Sensibilidad [Sensitivo]': 'Detecta las experiencias sensoriales ',
    'Registro [Espectador]': 'Ignora las entradas sensoriales ',
    'Auditivo': ' a los sonidos ',
    'Visual': ' a los estímulos visuales ',
    'Táctil': ' al tacto ',
    'Movimiento': ' al movimiento ',
    'Corporal': ' a la posición corporal ',
    'Oral': ' cuando tiene algo en la boca ',
    'Conductual': ' respuestas conductuales ',
    'Socioemocional': ' repuestas socioemocionales ',
    'Atencional': ' respuestas a las entradas sensoriales ',
}

onMounted(() => {
    initFlowbite();
})

function subirExcel(file) {
    const inputFile = document.getElementById('dropzone-file');
    fileName.value = file.name;

    readXlsxFile(inputFile.files[0]).then((rows) => {
        localStorage.setItem('excel-values', JSON.stringify(rows));
    })
}

onBeforeMount(() => {
    // setValues();
})

function setValues() {
    const hello = JSON.parse(localStorage.getItem('excel-values'));

    try {
        objectData.value = {
            'Búsqueda [Buscador]': hello[21][1],
            'Evitación [Evitativo]': hello[22][3],
            'Sensibilidad [Sensitivo]': hello[21][5],
            'Registro [Espectador]': hello[24][7],
            'Auditivo': hello[28][3],
            'Visual': hello[29][3],
            'Táctil': hello[30][3],
            'Movimiento': hello[31][3],
            'Corporal': hello[32][3],
            'Oral': hello[33][3],
            'Conductual': hello[34][3],
            'Socioemocional': hello[35][3],
            'Atencional': hello[36][3],
        }
        setInterpretations(cuadrantes);
        setInterpretations(sensoriales);
        setInterpretations(conductuales);
        setComments();
    } catch (error) {
        console.log(error);
        showModal('Ocurrió un error, vuelve a subir el archivo', false, { variant: 'danger' });
    }
}

function setInterpretations(array) {
    array.forEach(element => {
        for (let index = 0; index < element.ranges.length; index++) {
            const range = element.ranges[index]
            if(objectData.value[element.title] <= parseInt(range.split(' --- ')[1]) && objectData.value[element.title] >= parseInt(range.split(' --- ')[0])) {
                interpretaciones.value[element.title] = { index: index };
            }
        }
    });
}

function setComments() {
    for (const key in interpretaciones.value) {
        if (sensoriales.some(value => value.title === key)) {
            interpretaciones.value[key].comment =`Reacciona${interpretations[key]}${comparaciones[interpretaciones.value[key].index].toLowerCase()}`;
        }
        else if (conductuales.some(value => value.title === key)) {
            interpretaciones.value[key].comment =`Muestra${interpretations[key]}${comparaciones[interpretaciones.value[key].index].toLowerCase()}`;
        }
        else {
            interpretaciones.value[key].comment =`${interpretations[key]}${comparaciones[interpretaciones.value[key].index].toLowerCase()}`;
        }
    }
}

</script>