// Klik gambar untuk membuka halaman baru
document.querySelectorAll('.scroll-images img, .main-photo img').forEach(img => {
  img.addEventListener('click', () => {
    window.open('gallery.html', '_blank');
  });
});

const audio = document.getElementById('audio');
const playPause = document.getElementById('playPause');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const titleEl = document.getElementById('title');
const artistEl = document.getElementById('artist');
const coverEl = document.getElementById('cover');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

let isPlaying = false;
let currentSong = 0;

// === Playlist ===
const songs = [
  {
    title: "Spring Flowers",
    artist: "Lagu 1",
    src: "Spring-Flowers(chosic.com).mp3",
    cover: "Romantic.jpg"
  },
  {
    title: "Kesayangan ku",
    artist: "Al Ghazali",
    src: "Al_Ghazali_-_Kesayanganku_(mp3.pm).mp3",
    cover: "hq720.jpg"
  },
  {
    title: "Thank God I Found You",
    artist: "Mariah_Carey_feat",
    src: "Mariah_Carey_feat._Joe_-_Thank_God_I_Found_You_(mp3.pm).mp3",
    cover: "images (1).jpeg"
  }
];

// === Load Song ===
function loadSong(song) {
  titleEl.textContent = song.title;
  artistEl.textContent = song.artist;
  coverEl.src = song.cover;
  audio.src = song.src;
}

// === Play / Pause ===
function playSong() {
  audio.play();
  isPlaying = true;
  playPause.innerHTML = "<i class='bx bx-pause'></i>";
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playPause.innerHTML = "<i class='bx bx-play'></i>";
}

playPause.addEventListener('click', () => {
  if (isPlaying) pauseSong();
  else playSong();
});

// === Next & Prev Buttons ===
nextBtn.addEventListener('click', () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(songs[currentSong]);
  playSong();
});

prevBtn.addEventListener('click', () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(songs[currentSong]);
  playSong();
});

// === Progress Bar ===
audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;

    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    const durationMinutes = Math.floor(audio.duration / 60);
    const durationSeconds = Math.floor(audio.duration % 60);

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
    durationEl.textContent = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
  }
});

progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// === Auto Next Song ===
audio.addEventListener('ended', () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(songs[currentSong]);
  playSong();
});

// === Load first song on start ===
window.addEventListener('load', () => {
  loadSong(songs[currentSong]);
});

