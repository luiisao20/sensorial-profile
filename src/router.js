import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Test from '@/views/Test.vue';
import List from '@/views/List.vue';
import User from '@/views/User.vue';
import ProfilePatientVue from './views/List/ProfilePatient.vue';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/test',
        component: Test
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/user',
        component: User
    },
    {
        path: '/list',
        component: List,
        children: [
            {
                path: ':id',
                component: ProfilePatientVue,
                props: true
            }
        ]
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})