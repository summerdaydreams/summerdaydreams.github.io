document.addEventListener('DOMContentLoaded', function () { 
    const audioPlayer = document.getElementById('audio-player');
    const trackListItems = document.querySelectorAll('#track-list li');
    const currentTrackTitle = document.getElementById('current-track-title'); // UI Reference
    let currentTrackIndex = 0;

    // Function to load a track and play it
    function loadTrack(index) {
        const trackSource = trackListItems[index].getAttribute('data-src');
        audioPlayer.src = trackSource;
        audioPlayer.play();
        updateCurrentlyPlayingUI(trackListItems[index].innerText); // Sync UI with metadata
    }

    // Function to dynamically sync the UI with the currently playing track
    function updateCurrentlyPlayingUI(trackTitle) {
        trackListItems.forEach((item) => {
            item.style.color = ''; // Reset all list colors
        });

        // Highlight the currently playing track
        const currentListItem = Array.from(trackListItems).find(item => 
            item.getAttribute('data-src') === audioPlayer.src
        );
        if (currentListItem) {
            currentListItem.style.color = 'blue';
        }

        // Set the currently playing track's title
        currentTrackTitle.textContent = trackTitle;
    }

    // Automatically play the next track when the current one ends
    audioPlayer.addEventListener('ended', function () {
        currentTrackIndex = (currentTrackIndex + 1) % trackListItems.length; // Loop playback
        loadTrack(currentTrackIndex);
    });

    // Allow user to select a song by clicking on it
    trackListItems.forEach((item, index) => {
        item.addEventListener('click', function () {
            currentTrackIndex = index;
            loadTrack(index);
        });
    });

    // Ensure UI reflects the correct track information at the start
    loadTrack(currentTrackIndex);

    // Also dynamically update the audio player title as soon as track changes/loads
    audioPlayer.addEventListener('play', function () {
        const playingTrack = Array.from(trackListItems).find(item => 
            item.getAttribute('data-src') === audioPlayer.src
        );
        if (playingTrack) {
            updateCurrentlyPlayingUI(playingTrack.innerText);
        }
    });
});
