/* Treehouse FSJS Techdegree
 * Project 5 - Public API Requests App
 * script.js */




///// DOM VARIABLES /////
const searchContainer = document.querySelector(".search-container");
const gallery = document.querySelector("#gallery");
const body = document.querySelector("body");




///// FETCH FUNCTIONS /////
function fetchData(url) {
    return fetch(url)
        .then(response => response.json())
};

fetchData("https://randomuser.me/api/?results=12")
    .then(data => {
        const employeeList = data.results;
        console.log(employeeList);
        generateEmployeeCard(employeeList);
    })
    .then(generateSearchBar)



///// HELPER FUNCTIONS /////

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
    function generateEmployeeCard(data) {
        const galleryList = data.map(item => 
            `<div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${item.picture.large}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${item.name.first} ${item.name.last}</h3>
                    <p class="card-text">${item.email}</p>
                    <p class="card-text cap">${item.location.city}</p>
                </div>
            </div>
            `).join("");

        gallery.innerHTML = galleryList;
    };

    // Modal Window Markup:
    function generateModalWindow(profile) {
        // Declared variables from selected elements of employee profile
        let img = profile.querySelector("img");
        let name = profile.querySelector("h3");
        let email = profile.querySelector("p.card-text");
        let city = profile.querySelector("p.card-text.cap");

        // How do I capture the addtl info and populate it into the modal window?


        // Populate the specific user data on to HTML Markup Modal Window
        const modal = `
        <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${img.src}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${name.innerHTML}</h3>
                <p class="modal-text">${email.innerHTML}</p>
                <p class="modal-text cap">${city.innerHTML}</p>
                <hr>
                <p class="modal-text">(555) 555-5555</p>
                <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                <p class="modal-text">Birthday: 10/21/2015</p>
            </div>
        </div>
        `;

        body.innerHTML = modal;
    };




///// EVENT LISTENERS /////

gallery.addEventListener("click", function(event) {
    event.preventDefault();

    if (event.target !== gallery) {
        // Declare variable to hold 'closest' employee card
        let card = event.target.closest("div.card");
        console.log(card);
        generateModalWindow(card);
    };
});










