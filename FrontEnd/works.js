const reponse = await fetch("http://localhost:5678/api/works");
let works = await reponse.json();

const categ = await fetch("http://localhost:5678/api/categories");
let categories = await categ.json();

export function createWorks(works) {
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
const filters = document.querySelector(".filters");

const filterAll = document.querySelector(".filters-button");
filterAll.addEventListener("click", function(){filterWorks(filterAll, works)});

for(let i = 0; i < categories.length; i++) {
    const liFil = document.createElement("li");
    const buFil = document.createElement("button");
    buFil.classList.add("filters-button");
    buFil.dataset.id = categories[i].id;
    buFil.innerText = categories[i].name;
    buFil.addEventListener("click", function(){filterWorks(buFil, works)});

    filters.appendChild(liFil);
    liFil.appendChild(buFil);
}

function filterWorks(filter, work) {
    const remfil = document.getElementsByClassName("active");
    remfil[0].classList.remove("active");
    filter.classList.add("active");

    let filters = 0;
    if (filter.dataset.id == 0) {
        filters = work.filter(function(work) {
            return work.categoryId != 0;
        });
    } else {
        filters = work.filter(function(work) {
            return work.categoryId == filter.dataset.id;
        });
    }
    document.querySelector(".gallery").innerHTML = "";
    createWorks(filters);
}

