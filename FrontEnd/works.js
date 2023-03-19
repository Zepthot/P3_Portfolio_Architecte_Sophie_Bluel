const reponse = await fetch("http://localhost:5678/api/works");
let works = await reponse.json();

function createWorks(works) {
    for (let i = 0; i < works.length; i++) {
        console.log("works in for at "+ i + ":" + works);
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