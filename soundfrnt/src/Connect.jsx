document.getElementById('connectSpotifyBtn').addEventListener('click', () => {
    fetch('http://localhost:5000/connect_to_spotify',{
      method: 'GET',
    }).then(response =>{
      if (response.ok) {
        window.location.href = '/choice';
      } else{
        console.error('Failed to connect to spotify:', response.statusText)
      }
    })
  });
function Connect(){
    return(
    <div className="container">
    <button id="connectSpotifyBtn" className="pretty-button">
      Connect to Spotify
      <span><i className="ri-arrow-right-line"></i></span>
    </button>
    <div className="description">
      <p>Connect to Spotify to get personalized recommendations and create the perfect playlist tailored just for you. By connecting, our app can analyze your listening habits and preferences, allowing us to suggest tracks that match your taste and mood. Say goodbye to generic playlists and hello to a curated selection of music that speaks to you.</p>
    </div>
  </div>

    );
}
export default Connect