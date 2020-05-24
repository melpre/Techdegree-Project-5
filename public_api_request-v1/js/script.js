/* Treehouse FSJS Techdegree
 * Project 5 - Public API Requests App
 * script.js */




// DOM VARIABLES
const searchContainer = document.querySelector(".search-container");
const gallery = document.querySelector("#gallery");
const body = document.querySelector("body");


// FETCH FUNCTIONS
function fetchData(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))

};


// HELPER FUNCTIONS

// Search Bar Markup:
function generateSearchBar() {
    const search = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
    `;
    searchContainer.innerHTML = search;
};


// Gallery Markup:
function generateUserCard(data) {
    const card = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${data}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${data}</h3>
                <p class="card-text">${data}</p>
                <p class="card-text cap">${data}</p>
            </div>
        </div>
        `;
        gallery.innerHTML = card;
};

function generateUserImage() {

};







// EVENT LISTENERS






// TEST HERE
fetchData('https://randomuser.me/api/');
generateSearchBar();

