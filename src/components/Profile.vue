<template>
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
</template>

<script setup>
import Table from '@/components/Table.vue';
import Percentiles from '@/components/Percentiles.vue';
import { ref, watchEffect } from 'vue';

const props = defineProps({
    data: {
        required: true, type: Object
    }
})
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
const objectData = ref({});

watchEffect(() => {
    if(Object.keys(props.data).length > 0) setValues();
})

function setValues() {
    objectData.value = props.data
    setInterpretations(cuadrantes);
    setInterpretations(sensoriales);
    setInterpretations(conductuales);
    setComments();
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