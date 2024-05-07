import joblib
from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import pandas as pd
app = Flask(__name__)
CORS(app)

model = joblib.load('model.pkl')
train_data = pd.read_csv('tracks_features.csv')
y_train = train_data['id']
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

if __name__ == '__main__':
    app.run(debug=True)
