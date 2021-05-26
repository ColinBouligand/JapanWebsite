import {createRouter, createWebHistory} from 'vue-router'
import FlashCards from '../views/FlashCards'
import MemoryCard from '../views/MemoryCard'
import Home from '../views/Home'
import Drawing from '../views/Drawing'
import About from '../views/About'
import Kanji from '../views/Kanji'
import Pictures from '../views/Pictures'
import Search from '../views/Search'
import NotFoundComponent from '../views/NotFoundComponent'


const routes = [
    {
        path: '',
        redirect: {
            name: 'Home',
            component: Home,
            meta : {
                title: 'Accueil'
            }
        }
        
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta : {
            title: 'Accueil'
        }
        
    },
    {
        path: '/flashcards',
        name: 'FlashCards',
        component: FlashCards,
        meta : {
            title: 'Flashcards'
        }
    },
    {
        path: '/pictures',
        name: 'Pictures',
        component: Pictures,
        meta : {
            title: 'PicturesGame'
        }
    },
    {
        path: '/memorycard',
        name: 'MemoryCard',
        component: MemoryCard,
        meta : {
            title: 'Memorycard'
        }
    },
    {
        path: '/drawing',
        name: 'Drawing',
        component: Drawing,
        meta : {
            title: 'Dessin'
        }
    },
    {
        path: '/kanji/:kanji',
        name: 'Kanji',
        component: Kanji,
        meta : {
            title: 'Fiche Kanji'
        }
    },
    {
        path: '/search',
        name: 'Search',
        component: Search,
        meta : {
            title: 'Recherche'
        }
    },
    {
        path: '/about',
        name: 'About',
        component: About,
        meta : {
            title: 'A propos'
        }
    },
    { 
        path: '/:pathMatch(.*)*', //regex qui remplace * de vue2
        name: 'bad-not-found',
        component: NotFoundComponent,
        meta : {
            title: '404 not found'
        }
    },
]

const router = createRouter({
    mode: "history", //censé résoudre le problème de 404 quand on recharge une page autre que celle d'accueil
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.afterEach((to, from) =>{ 
    console.log(from,to)
    document.title = to.meta.title
})

export default router