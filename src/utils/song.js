export function formatDuration (duration) {
  let min = Math.floor(duration / 1000 / 60)
  let sec = Math.floor(duration / 1000 % 60)

  if (sec < 10) {
    sec = '0' + sec
  }

  return `${min}:${sec}`
}

export function formatArtists (artists) {
  return artists.map(artist => {
    return {
      id: artist.id,
      name: artist.name
    }
  })
}

export function formatAlbums (albums) {
  return albums.map(album => {
    return {
      id: album.id,
      name: album.name,
      picUrl: `${album.picUrl}?param=400y400`
    }
  })
}
