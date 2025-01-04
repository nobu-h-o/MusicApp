interface Song {
    name: string;
    artist: string;
    src: string;
}

// Create an array to store the data for the songs
const songData: Song[] = [
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
const container = document.querySelector<HTMLDivElement>(".container");
const songName = document.querySelector<HTMLSpanElement>(".song-name");
const songArtist = document.querySelector<HTMLSpanElement>(".song-artist");
const cover = document.querySelector<HTMLDivElement>(".cover");
const playPauseBtn = document.querySelector<HTMLButtonElement>(".play-pause");
const prevBtn = document.querySelector<HTMLButtonElement>(".prev-btn");
const nextBtn = document.querySelector<HTMLButtonElement>(".next-btn");
const audio = document.querySelector<HTMLAudioElement>(".audio");
const songTime = document.querySelector<HTMLDivElement>(".song-time");
const songProgress = document.querySelector<HTMLDivElement>(".song-progress");
const coverArtist = document.querySelector<HTMLSpanElement>(".cover span:nth-child(1)");
const coverName = document.querySelector<HTMLSpanElement>(".cover span:nth-child(2)");

// Ensure all elements are present
if (
    !container ||
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
    !coverName
) {
    throw new Error("One or more DOM elements are missing.");
}

let songIndex: number = 0;

// Load the initial song when the window loads
window.addEventListener("load", () => {
    loadSong(songIndex);
});

// Function to load a song based on the index
const loadSong = (index: number): void => {
    const song = songData[index];
    coverName.textContent = song.name;
    coverArtist.textContent = song.artist;
    songName.textContent = song.name;
    songArtist.textContent = song.artist;
    audio.src = `music/${song.src}`;
};

// Function to play the current song
const playSong = (): void => {
    container.classList.add("pause");
    const playPauseIcon = playPauseBtn.querySelector("i");
    if (playPauseIcon) {
        playPauseIcon.className = "fa-solid fa-pause";
    }
    audio.play();
    cover.classList.add("rotate");
};

// Function to pause the current song
const pauseSong = (): void => {
    container.classList.remove("pause");
    const playPauseIcon = playPauseBtn.querySelector("i");
    if (playPauseIcon) {
        playPauseIcon.className = "fa-solid fa-play";
    }
    audio.pause();
    cover.classList.remove("rotate");
};

// Toggle play/pause when the play/pause button is clicked
playPauseBtn.addEventListener("click", () => {
    if (container.classList.contains("pause")) {
        pauseSong();
    } else {
        playSong();
    }
});

// Function to play the previous song
const prevSongPlay = (): void => {
    songIndex = (songIndex - 1 + songData.length) % songData.length;
    loadSong(songIndex);
    playSong();
};

// Function to play the next song
const nextSongPlay = (): void => {
    songIndex = (songIndex + 1) % songData.length;
    loadSong(songIndex);
    playSong();
};

// Event listeners for previous and next buttons
prevBtn.addEventListener("click", prevSongPlay);
nextBtn.addEventListener("click", nextSongPlay);

// Update the song progress and time
audio.addEventListener("timeupdate", (e: Event) => {
    const target = e.target as HTMLAudioElement;
    const currentTime = target.currentTime;
    const duration = target.duration;

    if (duration) {
        const currentTimeWidth = (currentTime / duration) * 100;
        songProgress.style.width = `${currentTimeWidth}%`;

        const songCurrentTime = document.querySelector<HTMLSpanElement>(".time span:nth-child(1)");
        const songDuration = document.querySelector<HTMLSpanElement>(".time span:nth-child(2)");

        if (songCurrentTime && songDuration) {
            // Update duration once when metadata is loaded
            if (duration && songDuration.textContent === "") {
                const totalMinutes = Math.floor(duration / 60);
                let totalSeconds: number | string = Math.floor(duration % 60);
                if (totalSeconds < 10) {
                    totalSeconds = `0${totalSeconds}`;
                }
                songDuration.textContent = `${totalMinutes}:${totalSeconds}`;
            }

            // Update current time
            const currentMinutes = Math.floor(currentTime / 60);
            let currentSeconds: number | string = Math.floor(currentTime % 60);
            if (currentSeconds < 10) {
                currentSeconds = `0${currentSeconds}`;
            }
            songCurrentTime.textContent = `${currentMinutes}:${currentSeconds}`;
        }
    }
});

// Seek functionality when clicking on the song time progress bar
songTime.addEventListener("click", (e: MouseEvent) => {
    if (audio.duration) {
        const progressWidth = songTime.clientWidth;
        const clickedOffsetX = e.offsetX;
        audio.currentTime = (clickedOffsetX / progressWidth) * audio.duration;
        playSong();
    }
});

// Play the next song when the current one ends
audio.addEventListener("ended", nextSongPlay);
