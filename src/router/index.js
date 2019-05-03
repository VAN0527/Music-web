import Vue from 'vue'
import Router from 'vue-router'
import Find from 'views/Find.vue'
import SongList from 'views/SongList'
import Rank from 'views/Rank'
import MusicList from 'views/MusicList'
import Singer from 'views/Singer'
import SingerSongs from 'components/SingerSongs'
import SingerAlbums from 'components/SingerAlbums'
import SearchResult from 'views/SearchResult'
import SearchSongs from 'components/SearchSongs'
import SearchAlbums from 'components/SearchAlbums'
import SearchArtists from 'components/SearchArtists'
import SearchSongList from 'components/SearchSongList'
import PlayerPlayList from 'components/PlayerPlayList'
import SongDetail from 'views/SongDetail'

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
      path: '/singer',
      component: Singer,
      redirect: '/singer/songs',
      children: [
        {
          path: 'songs',
          component: SingerSongs
        },
        {
          path: 'albums',
          component: SingerAlbums
        }
      ]
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
    },
    {
      path: '/songdetail',
      component: SongDetail
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
