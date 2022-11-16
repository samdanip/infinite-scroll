const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let imageArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
const count = 10;
const api_key = "API_KEY";
const api_url = `https://api.unsplash.com/photos/random?client_id=${api_key}&count=${count}`;

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

function displayPhoto() {
  imagesLoaded = 0;
  totalImages = imageArray.length;
  imageArray.forEach((photo) => {
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    // create img tag
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);
    img.addEventListener("load", imageLoaded);
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

// Infinite Scroll functionality
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// OnLoad
getPhotos();
