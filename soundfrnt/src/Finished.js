document.getElementById('SavePlaylistBtn').addEventListener('click', () => {
    fetch('/add_playlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        alert('Playlist saved to Spotify!');
      } else {
        throw new Error('Failed to save playlist to Spotify.');
      }
    })
    .catch(error => {
      console.error(error);
      alert('Failed to save playlist to Spotify. Please try again later.');
    });
  });