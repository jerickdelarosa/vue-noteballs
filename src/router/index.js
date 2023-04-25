import { createRouter, createWebHashHistory } from 'vue-router'
import { useStoreAuth } from '@/stores/storeAuth'

/* Navigation */
import MainNav from '@/components/navigations/MainNav.vue'

/* Components */
import ViewNotes from '@/views/ViewNotes.vue'
import ViewStats from '@/views/ViewStats.vue'
import ViewEditNote from '@/views/ViewEditNote.vue'
import ViewAuth from '@/views/ViewAuth.vue'


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
        path: '/edit-note/:id',
        name: 'edit-note',
        components: {
            default: ViewEditNote,
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
        path: '/auth',
        name: 'auth',
        components: {
            default: ViewAuth,
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

// navigation guards
router.beforeEach(async (to, from) => {
    const storeAuth = useStoreAuth()
    if (!storeAuth.user.id && to.name !== 'auth') {
        return { name: 'auth' }
    }
    if (storeAuth.user.id && to.name === 'auth') {
        return false
    }
})


export default router