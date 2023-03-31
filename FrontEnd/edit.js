const reponse = await fetch("http://localhost:5678/api/works");
let works = await reponse.json();
const token = window.localStorage.getItem("token");
let modalTrashButton = [];

// Display edit buttons
if (token != null) {
    document.getElementById("onHeader").style.display = "block";
    document.getElementById("pictureButton").style.display = "block";
    document.getElementById("introButton").style.display = "block";
    document.getElementById("projectButton").style.display = "block";
}

// Modal
const modal = document.getElementById("modal");
const modalButton = document.getElementById("projectButton");
const modalClose = document.getElementsByClassName("modal-close")[0];

modalButton.onclick = function() {
  	modal.style.display = "block";
}

modalClose.onclick = function() {
  	modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//Display of all works on modal
function createModalWorks(works) {
  for(let j = 0; j < works.length; j++) {
    const inside = works[j];
    const modalGallery = document.querySelector(".modal-gallery");
    const modalFigure = document.createElement("figure");
    modalFigure.dataset.id = inside.id;
    modalFigure.classList.add("modal-figure");

    const modalImage = document.createElement("img");
    modalImage.src = inside.imageUrl;

    const modalTrash = document.createElement("button");
    modalTrash.classList.add("modal-trash");
    modalTrash.setAttribute("type", "button");
    modalTrash.dataset.id = inside.id;
	// modalTrashButton.push(modalTrash.addEventListener("click", function(){trashDelete(modalTrash)}));
    modalTrashButton.push(modalTrash.addEventListener("click", function(){trashButton(works, modalTrash)}));

    const iconTrash = document.createElement("i");
    iconTrash.classList.add("fa-solid", "fa-trash-can");

    const modalArrows = document.createElement("button");
    modalArrows.classList.add("modal-arrows");

    const iconArrows = document.createElement("i");
    iconArrows.classList.add("fa-solid", "fa-arrows-up-down-left-right");

    const modalEdit = document.createElement("button");
    modalEdit.classList.add("modal-edit");
    modalEdit.dataset.id = inside.id;
    modalEdit.innerText = "Éditer";

    modalGallery.appendChild(modalFigure);
    modalFigure.appendChild(modalImage);
    modalFigure.appendChild(modalTrash);
    modalTrash.appendChild(iconTrash);
    modalFigure.appendChild(modalArrows);
    modalArrows.appendChild(iconArrows);
	modalFigure.appendChild(modalEdit);
  }
}

createModalWorks(works)

// let trashButton = document.querySelector(".modal-trash");
// console.log(trashButton.dataset.id);
// console.log(trashButton.classList.value);
// console.log(modalTrashButton);

// for(let k = 0; k < modalTrashButton.length; k++) {
// 	//create var for every button
// 	//add listener on every button
// }

// trashButton.addEventListener("click", function(){trashDelete()});

// async function trashDelete(button) {
// 	console.log(button);
// 	console.log(button.dataset.id);

// 	const pictureId = {
// 		id: button.dataset.id,
// 	};
// 	console.log(pictureId);
// 	const payload = JSON.stringify(pictureId);
// 	const response = await fetch("http://localhost:5678/api/works/" + button.dataset.id, {
// 		method: "DELETE",
// 		headers: {
// 			"Accept": "application/json",
// 			"Authorization": "Bearer " + token,
// 		},
// 		body: payload,
// 	});

	
// 	console.log("response");
// 	console.log(response);
// 	console.log(response.status)
// 	if (response.status === 200) {
// 		console.log("response 200");
//         const data = await response.json();
// 		console.log("data");
// 		console.log(data);
// 		console.log(works);
// 		works.splice(button.dataset.id - 1, 1);
// 		console.log(works);
//     } else if (response.status === 401) {
//         // const errorMessage = document.getElementById("401");
//         // errorMessage.style.display = "block";
// 		console.log("response 401");
// 		alert("Unauthorized");
//     } else {
//         // const errorMessage = document.getElementById("404");
//         // errorMessage.style.display = "block";
// 		console.log("response 500");
// 		alert("Unexpected Behaviour");
//     }
// }

function trashButton(works, button) {
    const divGallery = document.querySelector(".gallery");
    works.splice(button.dataset.id - 1, 1);
    button.parentElement.remove();
    divGallery.childNodes[button.dataset.id - 1].remove();
}
