import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../layout/mainLayout.vue'
import Main from '../pages/Main.vue'
const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '/',
                component: Main
            }
        ],
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;