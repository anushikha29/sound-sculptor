import os
import sys
import json
import server.main as main
import webbrowser
import spotipy.util as util
import spotipy
from json.decoder import JSONDecodeError
from spotipy.oauth2 import SpotifyClientCredentials

def authenticate_spotify(client_id, client_secret):
    auth_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    sp = main.spotipy(auth_manager=auth_manager)
    return sp

# Example Usage
client_id = "b8a1c5e58a694410a5a544534bb6f0b2"
client_secret = "740fa7a3ee6d4847a28541145755b0c1"
sp = authenticate_spotify(client_id, client_secret)

#getting the username from terminal 
username = "mfoygc7rlel9h55bh7i672jqc"

#mfoygc7rlel9h55bh7i672jqc
#erase the cache and prompt for user permission

try:
    token = util.prompt_for_user_token(username)
except:
    os.remove(f".cache-{username}")
    token = util.prompt_for_user_token(username)

#create our spotify object
    
spotifyObject = main.spotipy(auth=token)