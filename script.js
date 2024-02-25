let data = [
  {
    img: "./img/animal.jpg",
    title: " Animal Song",
    contect: "LOremLOremLOremLOrem",
    mp3: "./song/animal.mp3",
  },
  {
    img: "./img/leo.avif",
    title: " Leo Song",
    contect: "LOremLOremLOremLOrem",
    mp3: "./song/leo.mp3",
  },
  {
    img: "./img/jawaan.jpg",
    title: " Jawaan Song",
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

function main() {
  let list = "";
  let card = "";
  data.map((data, i) => {
    card += `<div class="songcard" id=${i}>
              <div class="imgbox">
                <img src=${data.img} alt="">
              <h1>${data.title}</h1>
              <p>${data.contect}.</p>
              </div>
            </div>`;

    list += `<div class="songlist">
                      <div id="songlistbox">
                        <img src="${data.img}" alt="">
                        </div>
                        <h1>${data.title}</h1>
                    </div>`;
  });
  crrsong.innerHTML = audio.paused
    ? ""
    : `<img src="${data[slectedsong].img}" alt="">
`;
  audio.src = data[slectedsong].mp3;
  console.log(audio.src);
  songcards.innerHTML = card;
  mysongslist.innerHTML = list;

  // crrsong.style.backgroundImage = `url(${data[slectedsong].img})`;
}

main();

songcards.addEventListener("click", (dets) => {
  slectedsong = dets.target.id;
  play.innerHTML = '<i class="ri-pause-circle-fill"></i>';
  flag = 1;
  main();
  audio.play();
  document.title = `Spotify ${data[dets.target.id].title}`;
});

let flag = 0;
play.addEventListener("click", () => {
  if (flag === 0) {
    play.innerHTML = '<i class="ri-pause-circle-fill"></i>';
    main();
    audio.play();
    flag = 1;
  } else {
    play.innerHTML = '<i class="ri-play-circle-fill"></i>';
    main();
    audio.pause();
    flag = 0;
  }
});

forward.addEventListener("click", () => {
  if (slectedsong <= data.length - 1) {
    slectedsong++;
    main();
    audio.play();
  } else {
    forward.style.opacity = 0.4;
  }
});

back.addEventListener('click',()=>{
  if(slectedsong >= 0)
  {
    slectedsong--
    main();
    audio.play();
  }
  else{
    back.style.opacity = 0.4;
  }
})
