const token = window.localStorage.getItem("token");

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