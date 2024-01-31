//initialize the variables
let songIndex= 0;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById("masterplay");
let myprogressbar = document.getElementById("myProgressbar");
let gif = document.getElementById("gif");
let mastersongname = document.getElementById("mastersongname");
let songitems = Array.from(document.getElementsByClassName("songitem"));

let songs = [
    {songName: "Warriyo - Mortals( NCS Release )", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Ceilo ", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven - My Heart", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "JANJI-HEROES-TONIGHT", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "SONG 6", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "SONG 7", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "SONG 8", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "SONG 9", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "SONG 10", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"}
]

songitems.forEach((element, i)=> {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songName;
});

//handle play pause
masterplay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
//listen to event
audioElement.addEventListener('timeupdate', () => {
    console.log("timeupdated");
    //update Bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myprogressbar.value = progress;
})

myprogressbar.addEventListener('change', () => {
    audioElement.currentTime = myprogressbar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play'); 
    })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    element.addEventListener("click", (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        mastersongname.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        // masterplay.classList.remove('fa-circle-play');
        // masterplay.classList.add('fa-circle-pause');    
    })
})

document.getElementById('next').addEventListener('click', () => {
    if(songIndex > 9){
        songIndex = 0
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    mastersongname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    // masterplay.classList.remove('fa-circle-play');
    // masterplay.classList.add('fa-circle-pause'); 
})

document.getElementById('previous').addEventListener('click', () => {
    if(songIndex<=0){
        songIndex = 0
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    mastersongname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    // masterplay.classList.remove('fa-circle-play');
    // masterplay.classList.add('fa-circle-pause'); 
})