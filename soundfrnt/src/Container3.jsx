import React, { useState } from 'react';

function Container3() {
    const [formData, setFormData] = useState({
        acousticness: 0,
        energy: 0,
        instrumentalness: 0,
        loudness: 0,
        liveness: 0,
        tempo: 0,
        danceability: 0
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const submitSliders = () => {
        // Send data to Flask API
        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            
            console.log('Recommended song IDs:', data.recommended_song_ids);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    return (
        <div className="container3">
            <h1 className="tweak">Tweak your playlist</h1>

            <div className="slider-container">
            <div className="word">Acoustic</div>
                <input type="range" id='acousticness' min="0" max="100" defaultValue="0" className="slider" />
                
            </div>
            <div className="slider-container">
            <div className="word">Energy</div>
                <input type="range" id='energy' min="0" max="100" defaultValue="0" className="slider"></input>
                
            </div>
            <div className="slider-container">
            <div className="word">Instrumental</div>
                <input type="range" min="0" id='instrumentalness' max="100" defaultValue="0" className="slider"></input>
                
            </div>
            <div className="slider-container">
            <div className="word">Loud</div>
                <input type="range" min="0" id="loudness" max="100" defaultValue="0" className="slider"></input>
                
            </div>
            <div className="slider-container">
            <div className="word">Liveness</div>
                <input type="range" min="0" max="100" id="liveness" defaultValue="0" className="slider"></input>
                
            </div>
            <div className="slider-container">
            <div className="word">Tempo</div>
                <input type="range" id='tempo' min="0" max="100" defaultValue="0" className="slider"></input>
                
            </div>
            <div className="slider-container">
            <div className="word">Dance</div>
                <input type="range" id='danceability' min="0" max="100" defaultValue="0" className="slider"></input>
                
            </div>


            <button className="next3-button" onClick={submitSliders}>Next</button>
  </div>
    );
}
export default Container3