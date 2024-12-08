document.addEventListener('DOMContentLoaded', function () { 
    const audioPlayer = document.getElementById('audio-player');
    const trackListItems = document.querySelectorAll('#track-list li');
    const currentTrackTitle = document.getElementById('current-track-title'); // Reference to UI showing the current playing title
    let currentTrackIndex = 0;

    // Function to load a track and play it
    function loadTrack(index) {
        const trackSource = trackListItems[index].getAttribute('data-src');
        audioPlayer.src = trackSource;
        audioPlayer.play();
        updateCurrentlyPlayingUI(index);
    }

    // Function to update the UI with the currently playing track
    function updateCurrentlyPlayingUI(index) {
        // Reset other tracks' styles
        trackListItems.forEach((item) => {
            item.style.color = ''; // Clear style from all items
        });

        // Highlight the currently playing track
        trackListItems[index].style.color = 'blue';
        currentTrackTitle.textContent = trackListItems[index].innerText; // Display the current track title
    }

    // Play the next track automatically after the current one ends
    audioPlayer.addEventListener('ended', function () {
        currentTrackIndex = (currentTrackIndex + 1) % trackListItems.length; // Loop back to the first track if at the end
        loadTrack(currentTrackIndex);
    });

    // Handle clicks on the playlist for manual track selection
    trackListItems.forEach((item, index) => {
        item.addEventListener('click', function () {
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
        });
    });

    // Initialize the playlist by loading and playing the first track
    loadTrack(currentTrackIndex);
});
