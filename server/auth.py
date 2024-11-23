from dotenv import load_dotenv
from spotipy.oauth2 import SpotifyOAuth
from flask import url_for
import os

load_dotenv()
client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")

def authenticate_spotify():
    return SpotifyOAuth(
        client_id=client_id,
        client_secret=client_secret,
        redirect_uri=url_for('choice_page', _external= True),
        scope='user-library-read playlist-read-private user-top-read playlist-modify-public'
    )
