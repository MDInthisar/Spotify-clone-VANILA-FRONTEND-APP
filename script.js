let data = [
  {
    img: "./img/animal.jpg",
    title: "Animal Song",
    contect: "LOremLOremLOremLOrem",
    mp3: "./song/animal.mp3",
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

let slectedsong = 0;
let flag = 0;

// Add these variables at the top
let currentDisplayData = [];
const searchInput = document.getElementById('searchInput');

// Update main function
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

// Initialize currentDisplayData
currentDisplayData = data.map((song, index) => ({ ...song, originalIndex: index }));
main();

// Search functionality
searchInput.addEventListener('input', function(e) {
  const query = e.target.value.toLowerCase().trim();
  
  currentDisplayData = data
    .map((song, index) => ({ ...song, originalIndex: index }))
    .filter(song => song.title.toLowerCase().includes(query));
  
  main();
});

// Update existing event listeners to use dataset.originalIndex
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

// Update navigation controls to handle filtered data
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