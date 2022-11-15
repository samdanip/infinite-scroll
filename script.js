const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let imageArray = [];
const count = 10;
const api_key = "w8f8DAWFBS2Z3DNZVYenRjJXpsKO7CPNK1erzJDPZTs";
const api_url = `https://api.unsplash.com/photos/random?client_id=${api_key}&count=${count}`;

function displayPhoto() {
  imageArray.forEach((photo) => {
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    // create img tag
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(api_url);
    imageArray = await response.json();
    displayPhoto();
  } catch (error) {
    console.log(error);
  }
}

// OnLoad
getPhotos();
