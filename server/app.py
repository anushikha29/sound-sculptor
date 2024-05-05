import joblib
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
model = joblib.load('model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    input_features = [
        float(request.form['danceability']),
        float(request.form['energy']),
        float(request.form['loudness']),
        float(request.form['acousticness']),
        float(request.form['instrumentalness']),
        float(request.form['tempo']),
        float(request.form['liveness'])
    ]
    recommended_song_ids = model.predict([input_features])

    return jsonify({"recommended_song_ids":recommended_song_ids.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
