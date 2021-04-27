import {createRouter, createWebHistory} from 'vue-router'
import FlashCards from '../views/FlashCards'
import MemoryCard from '../views/MemoryCard'
import Home from '../views/Home'
import Drawing from '../views/Drawing'
import About from '../views/About'


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
        path: '/about',
        name: 'About',
        component: About
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),routes,
})

export default router