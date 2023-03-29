const reponse = await fetch("http://localhost:5678/api/works");
let works = await reponse.json();

function createWorks(works) {
    for (let i = 0; i < works.length; i++) {
        const inside = works[i];
        const divGallery = document.querySelector(".gallery");
        const insideElement = document.createElement("figure");
        insideElement.dataset.id = works[i].id;

        const imageElement = document.createElement("img");
        imageElement.src = inside.imageUrl;

        const titleElement = document.createElement("figcaption");
        titleElement.innerText = inside.title;

        divGallery.appendChild(insideElement);
        insideElement.appendChild(imageElement);
        insideElement.appendChild(titleElement);
    }
}

//Display of all works on page
createWorks(works)

//Display of all works on modal
function createModalWorks(works) {
    for(let j = 0; j < works.length; j++) {
        const inside = works[j];
        const modalGallery = document.querySelector(".modal-gallery");
        const modalFigure = document.createElement("figure");
        modalFigure.dataset.id = works[j].id;
        modalFigure.classList.add("modal-figure");

        const modalImage = document.createElement("img");
        modalImage.src = inside.imageUrl;

        const modalTrash = document.createElement("button");
        modalTrash.classList.add("modal-trash");

        const iconTrash = document.createElement("i");
        iconTrash.classList.add("fa-solid", "fa-trash-can");

        const modalArrows = document.createElement("button");
        modalArrows.classList.add("modal-arrows");

        const iconArrows = document.createElement("i");
        iconArrows.classList.add("fa-solid", "fa-arrows-up-down-left-right");

        const modalEdit = document.createElement("button");
        modalEdit.classList.add("modal-edit");
        modalEdit.dataset.id = works[j].id;
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

// //Filter all
// const filterAll = document.querySelector(".filters-all");

// filterAll.addEventListener("click", function() {
//     const worksAll = works.filter(function(works) {
//         return works.categoryId != 0;
//     });
//     document.querySelector(".gallery").innerHTML = "";
//     createWorks(worksAll);
// });

// //Filter objets
// const filterObjects = document.querySelector(".filters-objects");

// filterObjects.addEventListener("click", function() {
//     const worksObjects = works.filter(function(works) {
//         return works.categoryId == 1;
//     });
//     document.querySelector(".gallery").innerHTML = "";
//     createWorks(worksObjects);
// });

// //Filter flats
// const filterFlats = document.querySelector(".filters-flats");

// filterFlats.addEventListener("click", function() {
//     const worksFlats = works.filter(function(works) {
//         return works.categoryId == 2;
//     });
//     document.querySelector(".gallery").innerHTML = "";
//     createWorks(worksFlats);
// });

// //Filter hotels
// const filterHotels = document.querySelector(".filters-hotels");

// filterHotels.addEventListener("click", function() {
//     const worksHotels = works.filter(function(works) {
//         return works.categoryId == 3;
//     });
//     document.querySelector(".gallery").innerHTML = "";
//     createWorks(worksHotels);
// });

// Filters
const filterAll = document.querySelector(".filters-all");
filterAll.addEventListener("click", function(){filterWorks(filterAll, works)});

const filterObjects = document.querySelector(".filters-objects");
filterObjects.addEventListener("click", function(){filterWorks(filterObjects, works)});

const filterFlats = document.querySelector(".filters-flats");
filterFlats.addEventListener("click", function(){filterWorks(filterFlats, works)});

const filterHotels = document.querySelector(".filters-hotels");
filterHotels.addEventListener("click", function(){filterWorks(filterHotels, works)});

function filterWorks(filter, work) {
    let filters = 0;
    if (filter.id == 0) {
        filters = work.filter(function(work) {
            return work.categoryId != 0;
        });
    } else {
        filters = work.filter(function(work) {
            return work.categoryId == filter.id;
        });
    }
    document.querySelector(".gallery").innerHTML = "";
    createWorks(filters);
}