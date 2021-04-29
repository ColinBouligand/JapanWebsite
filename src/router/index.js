import {createRouter, createWebHistory} from 'vue-router'
import FlashCards from '../views/FlashCards'
import MemoryCard from '../views/MemoryCard'
import Home from '../views/Home'
import Drawing from '../views/Drawing'
import About from '../views/About'
import Kanji from '../views/Kanji'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Home',
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
        path: '/Drawing',
        name: 'Drawing',
        component: Drawing
    },
    {
        path: '/kanji/:kanji',
        name: 'Kanji',
        component: Kanji
    },
    {
        path: '/about',
        name: 'About',
        component: About
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),routes,
})

export default router