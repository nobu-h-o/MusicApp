// Create an array to store the data for the songs
var songData = [
    {
        name: "Novocaine 2",
        artist: "Shiloh Dynasty",
        src: "Novocaine2.mp3"
    },
    {
        name: "Heroes",
        artist: "RJ Pasin",
        src: "Heroes.mp3"
    },
    {
        name: "Drive",
        artist: "Oh Wonder",
        src: "Oh Wonder - Drive (Official Audio).mp3"
    },
    {
        name: "Fly",
        artist: "Fransis Derelle",
        src: "Fransis Derelle - Fly (feat. Parker Pohill) [NCS Release].mp3"
    },
    {
        name: "get you the moon",
        artist: "Kina",
        src: "Kina - get you the moon (ft. Snow).mp3"
    },
];
// Select DOM elements with appropriate types
var container = document.querySelector(".container");
var songName = document.querySelector(".song-name");
var songArtist = document.querySelector(".song-artist");
var cover = document.querySelector(".cover");
var playPauseBtn = document.querySelector(".play-pause");
var prevBtn = document.querySelector(".prev-btn");
var nextBtn = document.querySelector(".next-btn");
var audio = document.querySelector(".audio");
var songTime = document.querySelector(".song-time");
var songProgress = document.querySelector(".song-progress");
var coverArtist = document.querySelector(".cover span:nth-child(1)");
var coverName = document.querySelector(".cover span:nth-child(2)");
// Ensure all elements are present
if (!container ||
    !songName ||
    !songArtist ||
    !cover ||
    !playPauseBtn ||
    !prevBtn ||
    !nextBtn ||
    !audio ||
    !songTime ||
    !songProgress ||
    !coverArtist ||
    !coverName) {
    throw new Error("One or more DOM elements are missing.");
}
var songIndex = 0;
// Load the initial song when the window loads
window.addEventListener("load", function () {
    loadSong(songIndex);
});
// Function to load a song based on the index
var loadSong = function (index) {
    var song = songData[index];
    coverName.textContent = song.name;
    coverArtist.textContent = song.artist;
    songName.textContent = song.name;
    songArtist.textContent = song.artist;
    audio.src = "music/".concat(song.src);
};
// Function to play the current song
var playSong = function () {
    container.classList.add("pause");
    var playPauseIcon = playPauseBtn.querySelector("i");
    if (playPauseIcon) {
        playPauseIcon.className = "fa-solid fa-pause";
    }
    audio.play();
    cover.classList.add("rotate");
};
// Function to pause the current song
var pauseSong = function () {
    container.classList.remove("pause");
    var playPauseIcon = playPauseBtn.querySelector("i");
    if (playPauseIcon) {
        playPauseIcon.className = "fa-solid fa-play";
    }
    audio.pause();
    cover.classList.remove("rotate");
};
// Toggle play/pause when the play/pause button is clicked
playPauseBtn.addEventListener("click", function () {
    if (container.classList.contains("pause")) {
        pauseSong();
    }
    else {
        playSong();
    }
});
// Function to play the previous song
var prevSongPlay = function () {
    songIndex = (songIndex - 1 + songData.length) % songData.length;
    loadSong(songIndex);
    playSong();
};
// Function to play the next song
var nextSongPlay = function () {
    songIndex = (songIndex + 1) % songData.length;
    loadSong(songIndex);
    playSong();
};
// Event listeners for previous and next buttons
prevBtn.addEventListener("click", prevSongPlay);
nextBtn.addEventListener("click", nextSongPlay);
// Update the song progress and time
audio.addEventListener("timeupdate", function (e) {
    var target = e.target;
    var currentTime = target.currentTime;
    var duration = target.duration;
    if (duration) {
        var currentTimeWidth = (currentTime / duration) * 100;
        songProgress.style.width = "".concat(currentTimeWidth, "%");
        var songCurrentTime = document.querySelector(".time span:nth-child(1)");
        var songDuration = document.querySelector(".time span:nth-child(2)");
        if (songCurrentTime && songDuration) {
            // Update duration once when metadata is loaded
            if (duration && songDuration.textContent === "") {
                var totalMinutes = Math.floor(duration / 60);
                var totalSeconds = Math.floor(duration % 60);
                if (totalSeconds < 10) {
                    totalSeconds = "0".concat(totalSeconds);
                }
                songDuration.textContent = "".concat(totalMinutes, ":").concat(totalSeconds);
            }
            // Update current time
            var currentMinutes = Math.floor(currentTime / 60);
            var currentSeconds = Math.floor(currentTime % 60);
            if (currentSeconds < 10) {
                currentSeconds = "0".concat(currentSeconds);
            }
            songCurrentTime.textContent = "".concat(currentMinutes, ":").concat(currentSeconds);
        }
    }
});
// Seek functionality when clicking on the song time progress bar
songTime.addEventListener("click", function (e) {
    if (audio.duration) {
        var progressWidth = songTime.clientWidth;
        var clickedOffsetX = e.offsetX;
        audio.currentTime = (clickedOffsetX / progressWidth) * audio.duration;
        playSong();
    }
});
// Play the next song when the current one ends
audio.addEventListener("ended", nextSongPlay);
