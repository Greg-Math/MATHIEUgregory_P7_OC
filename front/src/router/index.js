import {createRouter, createWebHistory} from 'vue-router'
import Connexion from '@/views/Connexion.vue'
import Posts from '@/views/Posts.vue'
import Profile from '@/views/Profile.vue'
import Comment from '@/views/Comment.vue'
import AllProfile from '@/views/AllProfile.vue'


const routes = [
    {
        name: 'Connexion',
        path: '/',
        component: Connexion,
        meta: {
            title: "Groupomania - Page d'Acceuil",
        }
    },
    {
        name: 'Posts',
        path: '/posts',
        component: Posts,
        meta: {
            title: 'Groupomia - Publications',
        }
    },
    {
        name: 'Profile',
        path: '/profile/:userId',
        component: Profile,
        meta: {
            title: 'Mon Profil'
        }
    },
    {
        name: 'allProfile',
        path: '/profile/all',
        component: AllProfile,
        meta: {
            title: 'All Users'
        }
    },
    {
        name: 'Comment',
        path: '/comment/:postId',
        component : Comment,
        meta: {
            title: 'Nouveau commentaire'
        }
    }
]

const router = createRouter({
    base: process.env.BASE_URL,
    history: createWebHistory(),
    routes,
})

import store from '../store'

router.beforeEach((to, from, next) => {
    let user = localStorage.getItem('user')
    if (user) {
        try {
            user = JSON.parse(user)
            store.commit('logUser', user)
        }
        catch (error) {
            user = {}
        }
    }
    next()
})

export default router