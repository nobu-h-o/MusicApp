// create an array to store the data for the songs

const songData = [
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
]

const container = document.querySelector(".container");
const songName = document.querySelector(".song-name");
const songArtist = document.querySelector(".song-artist");
const cover = document.querySelector(".cover");
const playPauseBtn = document.querySelector(".play-pause");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const audio = document.querySelector(".audio");
const songTime = document.querySelector(".song-time");
const songProgress = document.querySelector(".song-progress");
const coverArtist = document.querySelector(".cover span:nth-child(1)");
const coverName = document.querySelector(".cover span:nth-child(2)");

let songIndex = 0;

window.addEventListener("load", () =>{
    loadSong(songIndex);
})

const loadSong = (index) => {
    coverName.textContent = songData[index].name;
    coverArtist.textContent = songData[index].artist;
    songName.textContent = songData[index].name;
    songArtist.textContent = songData[index].artist;
    audio.src = "music/" + songData[index].src;
    // audio.src = `music/${songData[index].src}`;
}

const playSong = () =>{
    container.classList.add("pause");
    playPauseBtn.firstElementChild.className = "fa-solid fa-pause";
    audio.play();
    cover.classList.add("rotate");
}


const pauseSong = () =>{
    container.classList.remove("pause");
    playPauseBtn.firstElementChild.className = "fa-solid fa-play";
    audio.pause();
    cover.classList.remove("rotate");
}

playPauseBtn.addEventListener("click", () => {
    if(container.classList.contains("pause")){
        pauseSong();
    }else{
        playSong();
    }
});

const prevSongPlay = () => {
    songIndex--;
    if(songIndex < 0){
        songIndex = songData.length - 1;
    }
    loadSong(songIndex);
    playSong();
}

const nextSongPlay = () => {
    songIndex++;
    if(songIndex > songData.length - 1){
        songIndex = 0;
    }
    loadSong(songIndex);
    playSong();
}

prevBtn.addEventListener("click", prevSongPlay);
nextBtn.addEventListener("click", nextSongPlay);

audio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let currentTimeWidth = (currentTime / duration) * 100;
    songProgress.style.width = currentTimeWidth + "%";

    let songCurrentTime = document.querySelector(".time span:nth-child(1)");
    let songDuration = document.querySelector(".time span:nth-child(2)");

    audio.addEventListener("loadeddata", () => {
        let audioDuration = audio.duration;

        let totalMinutes = Math.floor(audioDuration / 60);
        let totalSeconds = Math.floor(audioDuration % 60);
        if(totalSeconds < 10){
            totalSeconds = "0" + totalSeconds;
        }
        songDuration.textContent = totalMinutes + ":" + totalSeconds;

    });
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);

    if(currentSeconds < 10){
        currentSeconds = "0" + currentSeconds;
    }

    songCurrentTime.textContent = currentMinutes + ":" + currentSeconds;

});

songTime.addEventListener("click", (e) => {
    let progressWidth = songTime.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = audio.duration;
    audio.currentTime = clickedOffsetX / progressWidth * songDuration;
    playSong();
});

audio.addEventListener("ended", nextSongPlay);

