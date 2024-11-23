import time
import spotipy
import joblib
import numpy as np
import pandas as pd
import os
from spotipy.oauth2 import SpotifyOAuth
from auth import authenticate_spotify
from flask_cors import CORS, cross_origin   
from flask import Flask, request, url_for, session, redirect, jsonify

app = Flask(__name__)
CORS(app, origins=['http://localhost:5173','http://127.0.0.1:5000'],methods=['GET','POST','OPTIONS'], allow_headers=['Content-Type','Authorization'], )

model = joblib.load('model.pkl')
train_data = pd.read_csv('tracks_features.csv')
y_train = train_data['id']

#token value which allows our user to stay signed in
app.config['SESSION_COOKIE_NAME'] = 'sound_sculptor_cookie'
app.secret_key= os.urandom(24)
TOKEN_INFO = 'token_info'

#gets the authorization url and redirect the users to the page where the authorization is going to be done
@app.route('/connect_to_spotify')
@cross_origin()
def login():
    auth_url = authenticate_spotify().get_authorize_url()
    return redirect(auth_url)

#the redirected choice page which will appear to user after the authorization is done successfuly 
@app.route('/choice')
@cross_origin()
def choice_page():
    session.clear()
    code = request.args.get('code')
    token_info = authenticate_spotify().get_access_token(code)
    session[TOKEN_INFO] = token_info
    print("OAUTH SUCCESSFUL")
    #return redirect('http://127.0.0.1:5000/saveGeneratedPlaylist') 
    #for checking the saved weekly generated playlist
    
    return redirect('http://localhost:5173/Choice.html')


@app.route('/saveGeneratedPlaylist')
def save_generated_playlist():
    try:
        token_info = get_token()
        access_token = token_info.get('access_token')
    except:
        print("User not logged in")
        return redirect('/')
    sp = spotipy.Spotify(auth=access_token)
    user_id = sp.current_user()['id']
    saved_weekly_playlist_id = None
    def get_all_playlists(sp):
        playlists = []
        results = sp.current_user_playlists()
        playlists.extend(results['items'])
        while results['next']:
            results = sp.next(results)
            playlists.extend(results['items'])
        return playlists

    current_playlists = get_all_playlists(sp)

    for playlist in current_playlists:
        if(playlist['name']== "Discover Weekly"):
            discover_weekly_playlist_id = playlist['id']
        if(playlist['name']=="Saved Weekly"):
            saved_weekly_playlist_id = playlist['id']
    if not discover_weekly_playlist_id:
        return 'Discover Weekly not found'
    if not saved_weekly_playlist_id:
        new_playlist = sp.user_playlist_create(user_id, 'Saved Weekly', True)
        saved_weekly_playlist_id = new_playlist['id']
    
    discover_weekly_playlist = sp.playlist_items(discover_weekly_playlist_id)
    song_uris = []
    for song in discover_weekly_playlist['items']:
        song_uri=song['track']['uri']
        song_uris.append(song_uri)
    sp.user_playlist_add_tracks(user_id, saved_weekly_playlist_id, song_uris, None)
    return("SUCCESSS")

def get_token():
    token_info = session.get(TOKEN_INFO, None)
    if not token_info:
        redirect(url_for('login', _external=False))
    
    now = int(time.time())

    is_expired = token_info['expires_at'] - now < 60
    if(is_expired):
        spotify_oauth = authenticate_spotify()
        token_info = spotify_oauth.refresh_access_token(token_info['refresh_token'])

    return token_info
@app.route('/user_data')
def get_user_data():
    try:
        token_info = get_token()
    except:
        print("User not logged in")
        return redirect('/')
    sp=spotipy.Spotify(auth=token_info['access_token'])
    user_id = sp.current_user()['id']
    
    user_playlists = sp.current_user_playlists()
    user_albums = sp.current_user_saved_albums()
    user_top_artists = sp.current_user_top_artists()
    user_top_tracks = sp.current_user_top_tracks()
    
    return jsonify(user_playlists)

@app.route('/input_preferences', methods=['GET', 'POST'])
def input_preferences():
    if request.method == 'POST':
        mood = request.form.get('mood')
        genre = request.form.get('genre')
        # Store these preferences in the session or database for later use
        session['mood'] = mood
        session['genre'] = genre
        return redirect(url_for('generate_playlist'))
    return render_template('input_preferences.html')

# @app.route('/generate_curated_playlist')
# def generate_playlist():
#     try:
#         token_info = get_token()
#     except:
#         print("User not logged in")
#         return redirect('/')
#     sp = spotipy.Spotify(auth=token_info['access_token'])
#     user_id = sp.current_user()['id']
    
#     # Retrieve user's mood and genre preferences from the session
#     mood = session.get('mood')
#     genre = session.get('genre')

#     # Use these preferences to generate a playlist
#     # This is where you'll integrate with the Spotify API to create a playlist
#     # based on the user's preferences
    
#     # For demonstration, let's create a simple playlist
#     new_playlist = sp.user_playlist_create(user_id, 'Generated Playlist', True)
#     playlist_id = new_playlist['id']
    
#     # Add tracks to the playlist based on the user's preferences
#     # This is where you'll use the Spotify "Get Recommendations" API
    
#     return f"Playlist {playlist_id} created successfully!"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json  # Parse JSON data
    input_features = [
        float(data['danceability']),
        float(data['energy']),
        float(data['loudness']),
        float(data['acousticness']),
        float(data['instrumentalness']),
        float(data['tempo']),
        float(data['liveness'])
    ]
    input_features = np.array(input_features).reshape(1, -1)  # Reshape to 2D array
    distances, indices = model.kneighbors(input_features)  # Find nearest neighbors
    recommended_song_ids = y_train.iloc[indices[0]].tolist()


    return jsonify({"recommended_song_ids": recommended_song_ids})

app.run(debug=True)