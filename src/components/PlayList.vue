<template>
  <div class="playlist">
    <ul>
      <li
        class="playlist-item" 
        v-for="song in songs"
        :key="song.id"
        @click.stop="selectItem(song)"
      >
        <span class="name">{{song.name}} - </span>
        <span
          class="artists"
          v-for="artist in song.artists"
          @click="selectArtist(artist)"
        >
          {{artist.name}}
        </span>
        <span class="duration">{{song.duration}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    selectItem (item) {
      this.$emit('select', item)
    },
    selectArtist (artist) {
      const id = artist.id
      this.$router.push({
        path: `/singer/${id}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variable.scss';
.playlist {
  .playlist-item {
    padding: 0 40px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    
    &:hover {
      background-color: $hover-bg-color;
      color: rgb(167, 151, 151);
    }

    .artists {
      &:hover {
        color: $text-hover-color;
      }
    }

    .duration {
      float: right;
    }
  }
}
</style>

