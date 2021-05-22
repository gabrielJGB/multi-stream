if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
}

let boxes = document.querySelectorAll('#box');
let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
let windowButton = document.querySelector(".window-button");
let container = document.querySelector('.container');
let containerArray = Array.from(container.children);
let boxCount = 0;
let videoHeight = 480;
let videoWidth = 854;

slider.addEventListener('input', (e) => {
    videoHeight = e.target.value;
    videoWidth = (e.target.value * 16) / 9;
    output.innerHTML = videoHeight + "x" + parseInt(videoWidth);

    containerArray.forEach((video) => {
        video.firstChild.width = videoWidth;
        video.firstChild.height = videoHeight;
    })
})

let modal = document.querySelector('.modal');
let acceptButton = document.querySelector('.accept-button');
let cancelButton = document.querySelector('.cancel-button').addEventListener('click', closeWindow);
let users = document.querySelectorAll('.user-name');
let list = document.querySelector('.list');
let searchInput = document.querySelector('.search-input');

acceptButton.addEventListener('click', ()=>{
    let user = searchInput.value;
    addVideo(user);
    searchInput.value = "";
})

users.forEach((user) => {
    user.addEventListener('click', (e)=>{
        addVideo(e.target.textContent)
    });
})

windowButton.addEventListener('click', showWindow);

function closeWindow() {
    modal.style.display = "none";
}
function showWindow() {
    modal.style.display = "flex";
}

function removeVideo() {
    this.parentNode.remove()
}

function addVideo(user) {
    
    let box = document.createElement('DIV');
    let deleteButton = document.createElement('BUTTON');
    box.style.display = "flex";
    box.style["flex-direction"] = "column";
    box.style["box-shadow"] = "0 0 10px #0e0e0e";
    deleteButton.textContent = "Borrar";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener('click', removeVideo);

    boxCount++;
    box.id = "box" + boxCount;

    new Twitch.Player(box, {
        channel: user,
        height: videoHeight,
        width: videoWidth
    });
    box.appendChild(deleteButton);
    container.appendChild(box);
    containerArray = Array.from(container.children);

    closeWindow();
}


