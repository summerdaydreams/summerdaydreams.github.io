document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('audio-player');
    const trackListItems = document.querySelectorAll('#track-list li');
    const shuffleButton = document.getElementById('shuffle-button');
    const currentTrackTitle = document.getElementById('current-track-title');
    let currentTrackIndex = 0;
    let isShuffleOn = false; // Tracks shuffle mode

    // Function to load a track and play it
    function loadTrack(index) {
        const trackSource = trackListItems[index].getAttribute('data-src');
        audioPlayer.src = trackSource;
        audioPlayer.play();
        updateCurrentlyPlayingUI(trackListItems[index].innerText);
    }

    // Function to dynamically sync the UI with the currently playing track
    function updateCurrentlyPlayingUI(trackTitle) {
        trackListItems.forEach((item) => {
            item.style.color = '';
        });

        const currentListItem = Array.from(trackListItems).find(item =>
            item.getAttribute('data-src') === audioPlayer.src
        );
        if (currentListItem) {
            currentListItem.style.color = 'blue';
        }

        currentTrackTitle.textContent = trackTitle;
    }

    // Shuffle the playlist by randomly picking a track
    function shuffleTrack() {
        const randomIndex = Math.floor(Math.random() * trackListItems.length);
        currentTrackIndex = randomIndex;
        loadTrack(currentTrackIndex);
    }

    // Toggle shuffle mode when the shuffle button is clicked
    shuffleButton.addEventListener('click', function () {
        isShuffleOn = !isShuffleOn;
        shuffleButton.textContent = isShuffleOn ? 'Shuffle On' : 'Shuffle Off';
    });

    // Automatically play the next track, respecting shuffle mode
    audioPlayer.addEventListener('ended', function () {
        if (isShuffleOn) {
            shuffleTrack();
        } else {
            currentTrackIndex = (currentTrackIndex + 1) % trackListItems.length;
            loadTrack(currentTrackIndex);
        }
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
});
