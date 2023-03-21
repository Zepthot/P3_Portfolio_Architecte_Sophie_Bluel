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

createWorks(works)

//Filter all
const filterAll = document.querySelector(".filters-all");

filterAll.addEventListener("click", function() {
    const worksAll = works.filter(function(works) {
        return works.categoryId != 0;
    });
    document.querySelector(".gallery").innerHTML = "";
    createWorks(worksAll);
});

//Filter objets
const filterObjects = document.querySelector(".filters-objects");

filterObjects.addEventListener("click", function() {
    const worksObjects = works.filter(function(works) {
        return works.categoryId == 1;
    });
    document.querySelector(".gallery").innerHTML = "";
    createWorks(worksObjects);
});

//Filter flats
const filterFlats = document.querySelector(".filters-flats");

filterFlats.addEventListener("click", function() {
    const worksFlats = works.filter(function(works) {
        return works.categoryId == 2;
    });
    document.querySelector(".gallery").innerHTML = "";
    createWorks(worksFlats);
});

//Filter hotels
const filterHotels = document.querySelector(".filters-hotels");

filterHotels.addEventListener("click", function() {
    const worksHotels = works.filter(function(works) {
        return works.categoryId == 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    createWorks(worksHotels);
});