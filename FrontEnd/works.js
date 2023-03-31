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

