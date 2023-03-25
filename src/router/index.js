import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home'),
    redirect: '/home/discover',
    children: [
      {
        path: 'discover',
        name: 'discover',
        component: () => import('@/views/Home/Discover')
      },
      {
        path: 'toplist',
        name: 'toplist',
        component: () => import('@/views/Home/TopList')
      },
      {
        path: 'playlist',
        name: 'playlist',
        component: () => import('@/views/Home/PlayList')
      },
      {
        path: 'djradio',
        name: 'djradio',
        component: () => import('@/views/Home/Djradio')
      },
      {
        path: 'artists',
        name: 'artists',
        component: () => import('@/views/Home/Artist')
      },
      {
        path: 'album',
        name: 'album',
        component: () => import('@/views/Home/Album')
      },
      {
        path: 'search',
        name: 'album',
        component: () => import('@/views/Search')
      },
      {
        path: 'playdetail',
        name: 'playdetail',
        component: () => import('@/views/Home/PlayList/component/detail.vue')
      }
    ]
  },
  {
    path: '/mymusic',
    name: 'mymusic',
    component: () => import('@/views/MyMusic')
  },
  {
    path: '/focus',
    name: 'focus',
    component: () => import('@/views/Focus')
  },
  {
    path: '/download',
    name: 'download',
    component: () => import('@/views/Download')
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('@/views/Shop')
  },
  {
    path: '/artist',
    name: 'artist',
    component: () => import('@/views/Artist')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
