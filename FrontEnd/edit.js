import { createWorks } from "./works.js";

// Check if works is in local else fetch
let works = window.localStorage.getItem("works");
if (works == null) {
    const reponse = await fetch("http://localhost:5678/api/works");
    works = await reponse.json();
} else {
    window.localStorage.setItem("works", works);
}

const categ = await fetch("http://localhost:5678/api/categories");
let categories = await categ.json();
const token = window.localStorage.getItem("token");
// Checks to enable confirm button to add work
let checkPicture = false;
let checkTitle = false;
let checkCategory = false;
let toDeleteWorks = [];
let toAddWorks = [];

// Display edit buttons
if (token != null) {
    document.getElementById("onHeader").style.display = "block";
    document.getElementById("pictureButton").style.display = "block";
    document.getElementById("introButton").style.display = "block";
    document.getElementById("projectButton").style.display = "block";

    const publishButton = document.getElementById("validButton");
    publishButton.addEventListener("click", function(){publishWorks()});
}

// Modal
const modalDiv = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const modalEditButton = document.getElementById("projectButton");

modalEditButton.onclick = function() {
    modalDiv.style.display = "block";
    modalContent.innerHTML = "";
    modalContentGallery(modalContent, works);
}

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
        content.innerHTML = "";
        modalContentAdd(content, works);
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
      modalTrash.addEventListener("click", function(){trashButton(works, modalTrash)});
  
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

// Add trash button on every works
async function trashButton(works, button) {
    const divGallery = document.querySelector(".gallery");
    for(let i = 0; i < works.length; i++) {
        if(works[i].id == button.dataset.id) {
            button.parentElement.remove();
            divGallery.childNodes[i].remove();
        }
    }
    works.splice(button.dataset.id - 1, 1);
    toDeleteWorks.push(button.dataset.id);
}

// Delete function
async function deleteWork(id) {
    await fetch("http://localhost:5678/api/works/" + id, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + token,
        },
    });
}

// Generate modal to adding work
function modalContentAdd(content, works) {
    const spanClose = document.createElement("span");
    spanClose.classList.add("modal-close");
    spanClose.innerText = "×";

    const backButton = document.createElement("button");
    backButton.classList.add("modal-arrow");
    const backArrow = document.createElement("i");
    backArrow.classList.add("fa-solid", "fa-arrow-left");

    const title = document.createElement("h3");
    title.classList.add("modal-title");
    title.innerText = "Ajout photo";

    const formAdd = document.createElement("form");
    formAdd.setAttribute("enctype", "multipart/form-data");

    const divAdd = document.createElement("div");
    divAdd.classList.add("modal-add-div");

    const iconAdd = document.createElement("i");
    iconAdd.classList.add("modal-add-icon", "fa-regular", "fa-image");

    const labelButtonAdd = document.createElement("label");
    labelButtonAdd.setAttribute("for", "file-upload");
    labelButtonAdd.classList.add("modal-add-button");
    labelButtonAdd.innerText = "+ Ajouter photo";

    const inputAdd = document.createElement("input");
    inputAdd.setAttribute("accept", "image/jpeg, image/png")
    inputAdd.setAttribute("id", "file-upload");
    inputAdd.setAttribute("type", "file");
    inputAdd.addEventListener("change", function(){displayPicture(divAdd, confirmButton, inputAdd, checkFile, checkSize)});

    const infosAdd = document.createElement("span");
    infosAdd.classList.add("modal-add-infos");
    infosAdd.innerText = "jpeg, png : 4 Mo max";

    const picturePreview = document.createElement("img");
    picturePreview.classList.add("modal-picture-preview");
    picturePreview.setAttribute("id", "picture");

    const checkFile = document.createElement("p");
    checkFile.classList.add("notif-error");
    checkFile.innerText = "Mauvais format";

    const checkSize = document.createElement("p");
    checkSize.classList.add("notif-error");
    checkSize.innerText = "Trop lourd";

    const divField = document.createElement("div");
    divField.classList.add("modal-field-div");

    const labelTitle = document.createElement("label");
    labelTitle.classList.add("modal-add-label");
    labelTitle.setAttribute("for", "modal-add-title");
    labelTitle.innerText = "Titre";

    const fieldTitle = document.createElement("input");
    fieldTitle.classList.add("modal-add-field");
    fieldTitle.setAttribute("id", "modal-add-title");
    fieldTitle.addEventListener("change", function(){checkConfirm("title", confirmButton, fieldTitle.value)});

    const labelCategory = document.createElement("label");
    labelCategory.classList.add("modal-add-label");
    labelCategory.setAttribute("for", "modal-add-category");
    labelCategory.innerText = "Category";

    const fieldCategory = document.createElement("select");
    fieldCategory.classList.add("modal-add-field");
    fieldCategory.setAttribute("id", "modal-add-category");
    fieldCategory.addEventListener("change", function(){checkConfirm("category", confirmButton, fieldCategory)});

    const optionCategory = document.createElement("option");
    optionCategory.setAttribute("value", "select");
    optionCategory.innerText = "Sélectionner une catégorie";

    const rule = document.createElement("hr");
    rule.classList.add("modal-line");

    const confirmButton = document.createElement("button");
    confirmButton.classList.add("modal-add-confirm-button");
    confirmButton.setAttribute("type", "button");
    confirmButton.innerText = "Valider";
    confirmButton.disabled = true;
    // confirmButton.addEventListener("click", function(){postWork(inputAdd.files[0], fieldTitle.value, fieldCategory)});
    confirmButton.addEventListener("click", function(){addConfirmation(inputAdd.files[0], fieldTitle.value, fieldCategory)});

    content.appendChild(spanClose);
    backButton.appendChild(backArrow);
    content.appendChild(backButton);
    content.appendChild(title);
    content.appendChild(formAdd);
    formAdd.appendChild(divAdd);
    divAdd.appendChild(iconAdd);
    divAdd.appendChild(labelButtonAdd);
    labelButtonAdd.appendChild(inputAdd);
    divAdd.appendChild(infosAdd);
    divAdd.appendChild(picturePreview);
    formAdd.appendChild(checkFile);
    formAdd.appendChild(checkSize);
    formAdd.appendChild(divField);
    divField.appendChild(labelTitle);
    divField.appendChild(fieldTitle);
    divField.appendChild(labelCategory);
    divField.appendChild(fieldCategory);
    fieldCategory.appendChild(optionCategory);

    for(let j = 0 ; j < categories.length; j++) {
        const optionCategory = document.createElement("option");
        optionCategory.setAttribute("value", categories[j].name);
        optionCategory.innerText = categories[j].name;
        fieldCategory.appendChild(optionCategory);
    }

    formAdd.appendChild(rule);
    formAdd.appendChild(confirmButton);

    spanClose.onclick = function() {
        modal.style.display = "none";
    }

    backButton.onclick = function() {
        content.innerHTML = "";
        modalContentGallery(content, works);
    }
}

function displayPicture(display, confirmButton, image, notChecked, notSized) {
    if(display.childNodes[2].childNodes[1].files) {
        let reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById("picture").setAttribute("src", event.target.result)
        };

        reader.readAsDataURL(display.childNodes[2].childNodes[1].files[0]);

        for(let i = 0 ; i < display.childNodes.length - 1 ; i++) {
            if(display.childNodes[i].nodeName != "#comment") {
                display.childNodes[i].classList.add("display-none");
            }
        }

        const size = (image.files[0].size / 1024 / 1024).toFixed(2);
        if(size > 4) {
            notSized.style.display = "block";
        } else if(image.value.slice(-4) == ".png" || image.value.slice(-4) == "jpeg" || image.value.slice(-4) == ".jpg" || image.value.slice(-4) == "webp") {
            checkConfirm("picture", confirmButton, image);
        } else {
            notChecked.style.display = "block";
        }
    }
}

function checkConfirm(check, button, value) {
    if(value == "" || value == "select") {
        if(check == "picture") {
            checkPicture = false;
            button.style.backgroundColor = "#A7A7A7";
            button.style.cursor = "not-allowed";
            button.disabled = true;
        } else if(check == "title") {
            checkTitle = false;
            button.style.backgroundColor = "#A7A7A7";
            button.style.cursor = "not-allowed";
            button.disabled = true;
        } else {
            checkCategory = false;
            button.style.backgroundColor = "#A7A7A7";
            button.style.cursor = "not-allowed";
            button.disabled = true;
        }
    }

    if(check == "picture" && value != "") {
        checkPicture = true;
    } else if (check == "title" && value != "") {
        checkTitle = true;
    } else if (check == "category" && value != "" && value != "select") {
        checkCategory = true;
    }

    if(checkPicture && checkTitle && checkCategory) {
        button.style.backgroundColor = "#1D6154";
        button.disabled = false;
        button.style.cursor = "pointer";
    }
}

function addConfirmation(image, title, category) {
    let idCategory = 0;
    for(let k = 0; k < categories.length; k++) {
        if(category.value == categories[k].name) {
            idCategory = categories[k].id;
        }
    }

    const urlImage = URL.createObjectURL(image);

    const newWork = {
        id: works.length + 1,
        title: title,
        imageUrl: urlImage,
        image: image,
        categoryId: idCategory,
        userId: 1,
        category: {
            id: idCategory,
            name: category.value
        }
    };

    works.push(newWork);
    toAddWorks.push(newWork);
    const divGallery = document.querySelector(".gallery");
    divGallery.innerHTML = "";
    createWorks(works);
    modal.style.display = "none";
}

async function postWork(image, title, category) {
    let formData = new FormData();

    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", category);

    let req = new XMLHttpRequest();
    req.open("POST", "http://localhost:5678/api/works");
    req.setRequestHeader("Authorization", "Bearer " + token);
    req.send(formData);
}

function publishWorks() {
    for(let i = 0; i < toDeleteWorks.length; i++) {
        deleteWork(toDeleteWorks[i]);
    }
    for(let j = 0; j < toAddWorks.length; j++) {
        postWork(toAddWorks[j].image, toAddWorks[j].title, toAddWorks[j].categoryId);
    }
}
