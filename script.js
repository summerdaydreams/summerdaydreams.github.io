// Playlist Navigation
const audioPlayer = document.getElementById('audio-player');
const trackList = document.getElementById('track-list');

trackList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        const trackSrc = event.target.getAttribute('data-src');
        audioPlayer.src = trackSrc;
        audioPlayer.play();
    }
});
