document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('audio-player');
    const trackListItems = document.querySelectorAll('#track-list li');
    let currentTrackIndex = 0;

    // Load first track on page load
    function loadTrack(index) {
        const trackSource = trackListItems[index].getAttribute('data-src');
        audioPlayer.src = trackSource;
        audioPlayer.play();
    }

    // Play next track automatically
    audioPlayer.addEventListener('ended', function () {
        currentTrackIndex = (currentTrackIndex + 1) % trackListItems.length; // Loop back to first track after the last
        loadTrack(currentTrackIndex);
    });

    // Initialize the playlist with the first track
    loadTrack(currentTrackIndex);

    // Optionally allow user interaction with the playlist
    trackListItems.forEach((item, index) => {
        item.addEventListener('click', function () {
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
        });
    });
});
