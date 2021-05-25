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
let modal = document.querySelector('.modal');
let acceptButton = document.querySelector('.accept-button');
let cancelButton = document.querySelector('.cancel-button')
let users = document.querySelectorAll('.user-name');
let list = document.querySelector('.list');
let searchInput = document.querySelector('.search-input');
let slideContainer = document.querySelector('.slide-container');
let slideLeft = document.querySelector('.slide-left');


slideLeft.style.display = "none";
slideContainer.addEventListener('mouseover',showRange);
slideContainer.addEventListener('mouseout',hideRange);

document.addEventListener('keydown',(e)=>{
	if(e.key === 'Enter'){
		let user = searchInput.value;
		addVideo(user);
		searchInput.value = "";
	}
});

function showRange(){
	slideLeft.style.display = "";
	
}

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
	slideLeft.style.display = "";
}

function hideRange(){
	if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
		slideLeft.style.display = "none";
	}
}

windowButton.addEventListener('click', showWindow);
cancelButton.addEventListener('click', closeWindow);

slider.addEventListener('input', (e) => {
    videoHeight = e.target.value;
    videoWidth = (e.target.value * 16) / 9;
    output.innerHTML = videoHeight + "x" + parseInt(videoWidth);

    containerArray.forEach((video) => {
        video.firstChild.width = videoWidth;
        video.firstChild.height = videoHeight;
    })
})


acceptButton.addEventListener('click', ()=>{
    let user = searchInput.value;
    addVideo(user);
    searchInput.value = "";
})

users.forEach((user) => {
    user.addEventListener('click', (e)=>{
        addVideo(e.target.textContent);
    });
})

function addVideo(user) {
    
    let box = document.createElement('DIV');
    box.style.display = "flex";
    box.style["flex-direction"] = "column";
    box.style["box-shadow"] = "0 0 10px #0e0e0e";
	
	let deleteButton = document.createElement('BUTTON');
    deleteButton.textContent = "Borrar";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener('click', removeVideo);
	
	let userDiv = document.createElement('DIV');
	userDiv.textContent = user;
	userDiv.className = "user-div";

    boxCount++;
    box.id = "box" + boxCount;
	

    let player = new Twitch.Player(box, {
        channel: user,
        height: videoHeight,
        width: videoWidth
    });
	
	box.appendChild(userDiv);
    box.appendChild(deleteButton);
    container.appendChild(box);
    containerArray = Array.from(container.children);
    closeWindow();
}

function closeWindow() {
    modal.style.display = "none";
}
function showWindow() {
    modal.style.display = "flex";
}
function removeVideo() {
    this.parentNode.remove()
}

