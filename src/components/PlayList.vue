<template>
  <div class="playlist">
    <ul>
      <li
        class="playlist-item" 
        v-for="song in list"
        :key="song.id"
        @click.stop="selectItem(song)"
      >
        <div class="info">
          <span class="name">{{song.name}}</span>
          <div class="artists">
            <span
              class="artists-item"
              v-for="artist in song.artists"
              @click.stop="selectArtist(artist)"
            >
              {{artist.name}}
            </span>
          </div>
        </div>
        <span class="duration">{{song.duration}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    selectItem (item) {
      this.$emit('select', item)
    },
    selectArtist (artist) {
      this.$router.push({
        path: '/singer/songs',
        query: {
          id: artist.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variable.scss';
@import 'styles/mixin.scss';

.playlist {
  .playlist-item {
    padding: 5px 10px;
    height: 40px;
    border-bottom: 1px solid #fff;
    cursor: pointer;
    
    &:last-child {
      border-bottom: none;
    }

    .info {
      float: left;
      width: 70%;

      .name,
      .artists {
        width: 100%;
        height: 20px;
        display: block;
        line-height: 20px;
        @include no-wrap;
      }

      .artists {
        font-size: 0.7em;
        color: rgb(184, 184, 184);

        .artists-item {
          @media screen and (min-width: $width-large) {
            &:hover {
                color: $text-hover-color;
              }
          }
        }
      }
    }

    .duration {
      float: right;
      line-height: 40px;
    }
  }
}
</style>

