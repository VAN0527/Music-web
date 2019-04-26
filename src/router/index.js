import Vue from 'vue'
import Router from 'vue-router'
import Find from 'views/Find.vue'
import SongList from 'views/SongList'
import Rank from 'views/Rank'
import MusicList from 'views/MusicList'
import Singer from 'views/Singer'
import SearchResult from 'views/SearchResult'
import SearchSongs from 'components/SearchSongs'
import SearchAlbums from 'components/SearchAlbums'
import SearchArtists from 'components/SearchArtists'
import SearchSongList from 'components/SearchSongList'
import PlayerPlayList from 'components/PlayerPlayList'

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
    },
    {
      path: '/search',
      component: SearchResult,
      redirect: '/search/songs',
      children: [
        {
          path: 'songs',
          component: SearchSongs
        },
        {
          path: 'albums',
          component: SearchAlbums
        },
        {
          path: 'artists',
          component: SearchArtists
        },
        {
          path: 'songlist',
          component: SearchSongList
        }
      ]
    },
    {
      path: '/playlist',
      component: PlayerPlayList
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
