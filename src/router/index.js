import Vue from 'vue'
import Router from 'vue-router'
import Find from 'views/Find.vue'
import SongList from 'views/SongList'
import Rank from 'views/Rank'
import MusicList from 'views/MusicList'
import Singer from 'views/Singer'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/find'
    },
    {
      path: '/find',
      component: Find
    },
    {
      path: '/songlist',
      component: SongList
    },
    {
      path: '/musiclist/:id',
      component: MusicList
    },
    {
      path: '/album/:id',
      component: MusicList,
      props: {
        albums: true
      }
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/singer/:id',
      component: Singer
    }
  ]
})
