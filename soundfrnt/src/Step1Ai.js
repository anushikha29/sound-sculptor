function showRandomSuggestion() {
    // Clear previous suggestion
    document.getElementById('suggestionsList').innerHTML = '';

    // Get the prompt entered by the user
    const promptInput = document.getElementById('promptInput').value.trim();

    
    const examplePrompts = [
        "Chill Vibes",
        "Road Trip Anthems",
        "Feel-Good Classics",
        "Late Night Jazz",
        "Indie Discoveries",
        "Workout Pump-Up",
        "Study Focus",
        "Soulful Sundays",
        "Summer Breeze",
    "Morning Coffee",
    "Epic Movie Soundtracks",
    "Dance Party Hits",
    "Acoustic Serenade",
    "90s Nostalgia",
    "Feel-Good Pop",
    "Relaxing Rain Sounds",
    "Feel-Good R&B",
    "Sunset Chill",
    "Feel-Good Rock",
    "Smooth Jazz",
    "Classical Relaxation",
    "Motivation Boost",
    "Country Road Trip",
    "Funky Grooves",
    "Electronic Beats",
    "Throwback Thursday",
    "Latin Fiesta",
    "Reggae Vibes",
    "Motown Classics",
    "Ambient Dreams",
    "80s Flashback",
    "Blues & BBQ",
    "Retro Rewind",
    "Hip Hop Chillout",
    "Piano Reflections",
    "Folk Favorites",
    "Jazz Lounge"
        // Add more example prompts here as needed
    ];

    // Filter example prompts based on input
    const filteredPrompts = examplePrompts.filter(prompt => prompt.toLowerCase().includes(promptInput.toLowerCase()));

    // If filtered prompts exist
    if (filteredPrompts.length > 0) {
        // Select a random prompt from the filtered list
        const randomIndex = Math.floor(Math.random() * filteredPrompts.length);
        const randomPrompt = filteredPrompts[randomIndex];

        // Display the random prompt
        const suggestionsList = document.getElementById('suggestionsList');
        const listItem = document.createElement('li');
        listItem.textContent = randomPrompt;
        suggestionsList.appendChild(listItem);
    } else {
        // If no suggestions found
        const noSuggestionsItem = document.createElement('li');
        noSuggestionsItem.textContent = 'No suggestions found.';
        suggestionsList.appendChild(noSuggestionsItem);
    }
}
function finish(){
    window.location.href=("Finished.html");
}