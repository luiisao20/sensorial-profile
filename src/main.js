import './assets/main.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebase';
import { getFirestore } from "firebase/firestore";

import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router.js'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faFileLines, faLocationPin, faEye, faEyeSlash, faListOl, faUser, faVenus, faMars, faCakeCandles, faPenToSquare, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

library.add(faFileLines, faLocationPin, faEye, faEyeSlash, faListOl, faUser, faVenus, faMars, faCakeCandles, faPenToSquare, faRightFromBracket)

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')