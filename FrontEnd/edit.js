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
const modalContent = document.getElementById("modalContent");
const modalButton = document.getElementById("projectButton");
const modalClose = document.getElementsByClassName("modal-close")[0];
const modalAdd = document.getElementById("modalAdd");

modalButton.onclick = function() {
    modal.style.display = "block";
    //Add function to generate modal with base modal-content
    modalContent.innerHTML = "";
    modalContentGallery(modalContent, works);
}

// modalClose.onclick = function() {
//     modal.style.display = "none";
// }

// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

// modalAdd.onclick = function() {
//     modalContent.innerHTML = "";
//     modalContentAdd(modalContent);
// }

// Display of all works on modal
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

// createModalWorks(works)

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


// Generate gallery modal
function modalContentGallery(content, works) {
    const spanClose = document.createElement("span");
    spanClose.classList.add("modal-close");
    spanClose.innerText = "×";

    const title = document.createElement("h3");
    title.classList.add("modal-title");
    title.innerText = "Galerie photo";

    const gallery = document.createElement("div");
    gallery.classList.add("modal-gallery");
    
    const rule = document.createElement("hr");
    rule.classList.add("modal-line");

    const addButton = document.createElement("button");
    addButton.classList.add("modal-add");
    addButton.innerText = "Ajouter une photo";

    const breakLine = document.createElement("br");
    
    const delButton = document.createElement("button");
    delButton.classList.add("modal-delete");
    delButton.innerText = "Supprimer la galerie";

    content.appendChild(spanClose);
    content.appendChild(title);
    content.appendChild(gallery);
    createModalWorks(works);
    content.appendChild(rule);
    content.appendChild(addButton);
    content.appendChild(breakLine);
    content.appendChild(delButton);

    addButton.onclick = function() {
        modalContent.innerHTML = "";
        modalContentAdd(modalContent);
    }

    spanClose.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// Add trash button on every works
function trashButton(works, button) {
    const divGallery = document.querySelector(".gallery");
    for(let i = 0; i < works.length; i++) {
        console.log(works[i].id);
        if(works[i].id == button.dataset.id) {
            button.parentElement.remove();
            divGallery.childNodes[i].remove();
        }
    }
    works.splice(button.dataset.id - 1, 1);
}

// Generate modal to adding work
function modalContentAdd(content) {
    const spanClose = document.createElement("span");
    spanClose.classList.add("modal-close");
    spanClose.innerText = "×";

    const backArrow = document.createElement("i");
    backArrow.classList.add("modal-arrow");
    backArrow.classList.add("fa-solid", "fa-arrow-left");

    content.appendChild(spanClose);
    content.appendChild(backArrow);

    const modalClose = document.getElementsByClassName("modal-close")[0];
    modalClose.onclick = function() {
        modal.style.display = "none";
    }
}
