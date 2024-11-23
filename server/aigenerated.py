from flask import redirect, request, session
from openai import OpenAI
import spotipy
from main import app, login, get_token
import os
from dotenv import load_dotenv

load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

@app.route('/ai_generated_playlist', methods=['POST'])
def ai_generated():
    try:
        token_info = get_token()
    except:
        print("User not logged in")
        return redirect(login().auth_url)
    sp=spotipy.Spotify(auth=token_info['access_token'])
    prompt = request.json.get('prompt')
    client = OpenAI()
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-0301",
        messages=[
            {"role": "system",
             "content": "You are a MusicGPT, world's greatest music recommendation AI. Given a description of a user's music preference, you will recommend songs tailored to the user's preferences. You can create the best and most accurate playlists"
             },
            {
                "role" :"user",
                "content" : f"Create a playlist with minimum 10 songs recommendations and maximum 30 songs recommendations that fits the following description {prompt}. Come up with a creative name for the playlist as well"
            },
        ],
    )
    playlist_id = response['choices'][0]['message']['function_call']['arguments']['playlist_id']
    session['playlist_id'] = playlist_id

    return redirect('/Finished.html')

@app.route('/add_playlist', methods=['POST'])
def add_playlist():
    playlist_id = session.get('playlist_id')
    user_id = ai_generated().sp.current_user()['id']
    
    ai_generated().sp.user_playlist_add_to_library(user_id, playlist_id)  
    
    return 'Playlist added to user\'s Spotify account', 200