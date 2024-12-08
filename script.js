document.addEventListener('DOMContentLoaded', function () { 
    const audioPlayer = document.getElementById('audio-player');
    const trackListItems = document.querySelectorAll('#track-list li');
    const currentTrackTitle = document.getElementById('current-track-title'); // Reference to the "Currently Playing" section
    let currentTrackIndex = 0;

    // Function to load a track and play it
    function loadTrack(index) {
        const trackSource = trackListItems[index].getAttribute('data-src');
        audioPlayer.src = trackSource;
        audioPlayer.play();
        updateCurrentlyPlayingUI(index);
    }

    // Function to update the UI to show the currently playing track
    function updateCurrentlyPlayingUI(index) {
        // Highlight all playlist items to reset their styles
        trackListItems.forEach((item) => {
            item.style.color = ''; // Reset style for all
        });

        // Highlight the currently playing track in the playlist
        trackListItems[index].style.color = 'blue';
        currentTrackTitle.textContent = trackListItems[index].innerText; // Update the UI text with the track's title
    }

    // Automatically play the next track when the current one ends
    audioPlayer.addEventListener('ended', function () {
        currentTrackIndex = (currentTrackIndex + 1) % trackListItems.length; // Loop back to the start after the last song
        loadTrack(currentTrackIndex);
    });

    // Allow user to click on tracks to select and play them manually
    trackListItems.forEach((item, index) => {
        item.addEventListener('click', function () {
            currentTrackIndex = index; // Set index to the clicked track
            loadTrack(currentTrackIndex);
        });
    });

    // Initialize by loading the first track
    loadTrack(currentTrackIndex);
});
