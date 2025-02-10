let data = [
  {
    img: "./img/animal.jpg",
    title: "Animal Song",
    contect: "LOremLOremLOremLOrem",
    mp3: "./song/animal.mp3",
  },
  {
    img: "https://imgs.search.brave.com/VUBQJ8t9lqDcTmM8heDe-DbXryKRsMsfJUe3vTFe1as/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1QlkyTmtNRE14/TmpJdE5tWXlZUzAw/WlRFd0xXSmxOamd0/TUdGak1UbGxZakpq/WmpZd1hrRXlYa0Zx/Y0djQC5qcGc",
    title: "Derniere-Danse Song",
    contect: "LOremLOremLOremLOrem",
    mp3: "./song/Derniere-Danse.mp3",
  },
  {
    img: "./img/leo.avif",
    title: "Leo Song",
    contect: "LOremLOremLOremLOrem",
    mp3: "./song/leo.mp3",
  },
  {
    img: "./img/jawaan.jpg",
    title: "Jawaan Song",
    contect: "LOremLOremLOremLOrem",
    mp3: "./song/jawaan.mp3",
  },
];
let audio = new Audio();
let crrsong = document.querySelector(".crrsong");
let songcards = document.querySelector("#songcards");
let mysongslist = document.querySelector(".mysongslist");
let play = document.getElementById("play");
let back = document.getElementById("back");
let forward = document.getElementById("forward");
let searchInput = document.getElementById("searchInput");
let albumArtCursor = document.getElementById("albumArtCursor");

let currentDisplayData = [];
let slectedsong = 0;
let flag = 0;

function main() {
  let list = "";
  let card = "";
  
  currentDisplayData.forEach((song) => {
    card += `<div class="songcard" data-original-index="${song.originalIndex}">
              <div class="imgbox">
                <img src="${song.img}" alt="">
                <h1>${song.title}</h1>
                <p>${song.contect}</p>
              </div>
            </div>`;

    list += `<div class="songlist" data-original-index="${song.originalIndex}">
              <div class="songlistbox">
                <img src="${song.img}" alt="">
              </div>
              <h1>${song.title}</h1>
            </div>`;
  });

  crrsong.innerHTML = `<img src="${data[slectedsong].img}" alt="">`;
  audio.src = data[slectedsong].mp3;
  songcards.innerHTML = card;
  mysongslist.innerHTML = list;
}

// Initialize data
currentDisplayData = data.map((song, index) => ({ ...song, originalIndex: index }));
main();

// Event Listeners
songcards.addEventListener("click", (dets) => {
  const songcard = dets.target.closest('.songcard');
  if (!songcard) return;
  
  slectedsong = parseInt(songcard.dataset.originalIndex, 10);
  play.innerHTML = '<i class="ri-pause-circle-fill"></i>';
  flag = 1;
  main();
  audio.play();
  document.title = `Spotify ${data[slectedsong].title}`;
});

mysongslist.addEventListener("click", (e) => {
  const songlistItem = e.target.closest('.songlist');
  if (!songlistItem) return;
  
  slectedsong = parseInt(songlistItem.dataset.originalIndex, 10);
  play.innerHTML = '<i class="ri-pause-circle-fill"></i>';
  flag = 1;
  main();
  audio.play();
  document.title = `Spotify ${data[slectedsong].title}`;
});

play.addEventListener("click", () => {
  if (flag === 0) {
    play.innerHTML = '<i class="ri-pause-circle-fill"></i>';
    audio.play();
    flag = 1;
  } else {
    play.innerHTML = '<i class="ri-play-circle-fill"></i>';
    audio.pause();
    flag = 0;
  }
  main();
});

forward.addEventListener("click", () => {
  if (slectedsong < data.length - 1) {
    slectedsong++;
  } else {
    slectedsong = 0;
  }
  main();
  audio.play();
  play.innerHTML = '<i class="ri-pause-circle-fill"></i>';
  flag = 1;
});

back.addEventListener("click", () => {
  if (slectedsong > 0) {
    slectedsong--;
  } else {
    slectedsong = data.length - 1;
  }
  main();
  audio.play();
  play.innerHTML = '<i class="ri-pause-circle-fill"></i>';
  flag = 1;
});

audio.addEventListener('ended', () => {
  forward.click();
});

// Search functionality
searchInput.addEventListener('input', function(e) {
  const query = e.target.value.toLowerCase().trim();
  
  currentDisplayData = data
    .map((song, index) => ({ ...song, originalIndex: index }))
    .filter(song => song.title.toLowerCase().includes(query));
  
  main();
});

// Custom cursor functionality
document.addEventListener('mousemove', (e) => {
  albumArtCursor.style.left = `${e.clientX - 20}px`;
  albumArtCursor.style.top = `${e.clientY - 20}px`;
});

songcards.addEventListener('mouseover', (e) => {
  const songcard = e.target.closest('.songcard');
  if (songcard) {
    const index = songcard.dataset.originalIndex;
    albumArtCursor.style.backgroundImage = `url('${data[index].img}')`;
    albumArtCursor.style.display = 'block';
  }
});

songcards.addEventListener('mouseout', () => {
  albumArtCursor.style.display = 'none';
});

mysongslist.addEventListener('mouseover', (e) => {
  const songlistItem = e.target.closest('.songlist');
  if (songlistItem) {
    const index = songlistItem.dataset.originalIndex;
    albumArtCursor.style.backgroundImage = `url('${data[index].img}')`;
    albumArtCursor.style.display = 'block';
  }
});

mysongslist.addEventListener('mouseout', () => {
  albumArtCursor.style.display = 'none';
});