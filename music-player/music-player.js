// Define the list of tracks that have to be played
let track_list = [
    {
        name: "HIGHEST IN THE ROOM",
        artist: "Travis Scott",
        path: "/music-player/song-files/HIGHEST IN THE ROOM.mp3",  // Ensure you use actual URLs
        image: "https://upload.wikimedia.org/wikipedia/en/b/b4/Travis_Scott_-_Highest_in_the_Room.png"
    },
    {
        name: "Hotline Bling",
        artist: "Drake",
        path: "/music-player/song-files/Hotline Bling.mp3",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Drake_-_Hotline_Bling.png"
    },
    {
        name: "Glimpse of Us",
        artist: "XXXTentacion",
        path: "/music-player/song-files/Glimpse Of Us.mp3",
        image: "https://upload.wikimedia.org/wikipedia/en/4/4a/Joji_-_Glimpse_of_Us.png",
    },
    {
        name: "Night Changes",
        artist: "One Direction",
        path: "/music-player/song-files/Night Changes.mp3",
        image: "https://upload.wikimedia.org/wikipedia/en/d/d1/One_Direction_-_Night_Changes_Single_Cover.png",
    },
    {
        name: "Sweater Weather",
        artist: "The Neighbourhood",
        path: "/music-player/song-files/Sweater Weather.mp3",
        image: "https://upload.wikimedia.org/wikipedia/en/6/6c/Sweater_Weather_%28The_Neighborhood_single_cover%29.jpg",
    }
];

let now_playing, track_art, track_name, track_artist, playpause_btn, next_btn, prev_btn,
    seek_slider, volume_slider, curr_time, total_duration, track_index, isPlaying, updateTimer, curr_track;

function initializeMusicPlayer() {
    var toggleButton = document.getElementById('toggle-music-player');
    var musicPlayerContainer = document.getElementById('music-player-container');
    var musicPlayer = document.getElementById('music-player')

    toggleButton.addEventListener('click', function () {
        musicPlayerContainer.classList.toggle('hide');
        musicPlayer.classList.toggle('minimized');
    });

    // Select all the elements in the HTML page and assign them to variables
    now_playing = document.querySelector(".now-playing");
    track_art = document.querySelector(".track-art");
    track_name = document.querySelector(".track-name");
    track_artist = document.querySelector(".track-artist");
    playpause_btn = document.querySelector(".playpause-track");
    next_btn = document.querySelector(".next-track");
    prev_btn = document.querySelector(".prev-track");
    seek_slider = document.querySelector(".seek_slider");
    volume_slider = document.querySelector(".volume_slider");
    curr_time = document.querySelector(".current-time");
    total_duration = document.querySelector(".total-duration");

    track_index = 0;
    isPlaying = false;
    document.querySelector(".playpause-track").innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    curr_track = document.createElement('audio');

    loadTrack(track_index);

    // Attach initialization and toggle functionality to the toggle button
    let playerContent = document.getElementById('player'); // The container for all player content

    if (toggleMusicPlayerButton) {
        toggleMusicPlayerButton.addEventListener('click', function() {
            playerContent.classList.toggle('hide');
        });
    } else {
        console.error('toggleMusicPlayerButton is null');
    }

    toggleButton.addEventListener('click', function () {
        musicPlayerContainer.classList.toggle('hide');
        musicPlayer.classList.toggle('minimized');
    });

    // Event listeners for player buttons and sliders
    playpause_btn.addEventListener('click', playpauseTrack);
    next_btn.addEventListener('click', nextTrack);
    prev_btn.addEventListener('click', prevTrack);
    seek_slider.addEventListener('input', seekTo);
    volume_slider.addEventListener('input', setVolume);

    // Listen for events from curr_track
    curr_track.addEventListener('timeupdate', seekUpdate);
    curr_track.addEventListener('ended', nextTrack);

}

function loadTrack(index) {
    clearInterval(updateTimer);
    resetValues();

    // Load a new track
    curr_track.src = track_list[index].path;
    curr_track.load();

    // Update details of the track
    document.querySelector(".track-art").style.backgroundImage = `url(${track_list[index].image})`;
    document.querySelector(".track-name").textContent = track_list[index].name;
    document.querySelector(".track-artist").textContent = track_list[index].artist;
    document.querySelector(".now-playing").textContent = `PLAYING ${index + 1} OF ${track_list.length}`;

    let audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = track_list[index];

    // Set up the update timer
    updateTimer = setInterval(seekUpdate, 1000);

    // Move to the next track if the current finishes playing
    curr_track.addEventListener('ended', nextTrack);

    if (!isPlaying) { // Auto-play the loaded track if the player was already playing
        playTrack();
    }
}

function resetValues() {
    curr_time.textContent = '00:00';
    total_duration.textContent = '00:00';
    seek_slider.value = 0;
}

function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    document.querySelector(".playpause-track").innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    document.querySelector(".playpause-track").innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
    if (track_index < track_list.length - 1)
        track_index += 1;
    else 
        track_index = 0;
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index > 0)
        track_index -= 1;
    else 
        track_index = track_list.length - 1;
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;
    // Check if the current track duration is a legitimate number before updating
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        // Add a zero to single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        // Update the current time text
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        // Update the total duration text
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

function random_bg_color() {
    let red = Math.floor(Math.random() * 192) + 64;
    let green = Math.floor(Math.random() * 192) + 64;
    let blue = Math.floor(Math.random() * 192) + 64;
    document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

document.addEventListener('DOMContentLoaded', initializeMusicPlayer);