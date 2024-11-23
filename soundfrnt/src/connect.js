document.getElementById('connectSpotifyBtn').addEventListener('click', () => {
  // Redirect the user to the /connect_to_spotify route to start the OAuth flow
  window.location.href = 'http://localhost:5000/connect_to_spotify';
});