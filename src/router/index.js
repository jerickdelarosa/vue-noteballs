import { createRouter, createWebHashHistory } from 'vue-router'

/* Navigation */
import MainNav from '@/components/navigations/MainNav.vue'

/* Components */
import ViewNotes from '@/views/ViewNotes.vue'
import ViewStats from '@/views/ViewStats.vue'

/* 404 */
import PageNotFound from '@/views/PageNotFound.vue'

const routes = [
    {
        path: '/',
        name: 'notes',
        components: {
            default: ViewNotes,
            navigation: MainNav
        }
    },
    {
        path: '/stats',
        name: 'stats',
        components: {
            default: ViewStats,
            navigation: MainNav
        }
    },
    {
        path: '/:catchAll(.*)*',
        name: 'page-not-found',
        components: {
            default: PageNotFound,
            navigation: MainNav
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router