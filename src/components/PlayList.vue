<template>
  <div class="playlist">
    <ul>
      <li
        class="playlist-item" 
        v-for="song in list"
        :key="song.id"
      > 
        <span class="play-icon">
          <i
            class="icon-bofang"
            @click.stop="selectItem(song)"
          ></i>
        </span>
        <div class="info">
          <span class="name">{{song.name}}</span>
          <div class="artists">
            <span
              class="artists-item"
              v-for="(artist, index) in song.artists"
              :key="index"
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
    padding: 5px 20px;
    height: 40px;
    border-bottom: 1px solid rgba(185, 185, 185, 0.5);
    
    &:last-child {
      border-bottom: none;
    }

    .play-icon {
      float: left;
      font-size: 2em;
      cursor: pointer;

      &:hover {
        color: $text-hover-color;
      }
    }

    .info {
      float: left;
      margin-left: 5px;
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
        cursor: pointer;

        .artists-item {
          &:hover {
              color: $text-hover-color;
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

