const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
const count = 30;
const apiKey = '6C93j-ZYgYP4TlF7QMVNFrfxS8XY_og5zvmzm6auvXw';
const apiUrl = `https://api.unsplash.com/photos/random?
client_id=${apiKey}&count=${count}`;


// Helper function to set Attriutes on DOM elements
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        imagesLoaded = 0;
        loader.hidden = true;
    }
}

// Create elements for links & photos, Add to DOM
function displayPhotos() {
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash

        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response  = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(err) {
        console.error(err);
    }
}


window.addEventListener('scroll', () => {
     if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
     }

})

// on load
getPhotos();

