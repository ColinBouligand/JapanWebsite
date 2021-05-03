import {createRouter, createWebHistory} from 'vue-router'
import FlashCards from '../views/FlashCards'
import MemoryCard from '../views/MemoryCard'
import Home from '../views/Home'
import Drawing from '../views/Drawing'
import About from '../views/About'
import Kanji from '../views/Kanji'
import Search from '../views/Search'
import NotFoundComponent from '../views/NotFoundComponent'




const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/flashcards',
        name: 'FlashCards',
        component: FlashCards
    },
    {
        path: '/memorycard',
        name: 'MemoryCard',
        component: MemoryCard
    },
    {
        path: '/drawing',
        name: 'Drawing',
        component: Drawing
    },
    {
        path: '/kanji/:kanji',
        name: 'Kanji',
        component: Kanji
    },
    {
        path: '/search',
        name: 'Search',
        component: Search
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    /*{
        path: '*', 
        name : 'Error 404',        
        component: NotFoundComponent
    }*/
    { 
        path: '/:pathMatch(.*)',
        name: 'bad-not-found',
        component: NotFoundComponent
    },
]

const router = createRouter({
    mode: "history", //censé résoudre le problème de 404 quand on recharge une page autre que celle d'accueil
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router