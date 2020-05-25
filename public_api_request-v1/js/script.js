/* Treehouse FSJS Techdegree
 * Project 5 - Public API Requests App
 * script.js */




///// DOM VARIABLES /////
const searchContainer = document.querySelector(".search-container");
const gallery = document.querySelector("#gallery");
const body = document.querySelector("body");
const employeeCard = document.querySelector("div.card");




///// FETCH FUNCTIONS /////
function fetchData(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => generateEmployeeCard(data.results));
};



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
    const employees = data.map(employee => `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}</p>
            </div>
        </div>
        `).join("");

        gallery.innerHTML = employees;
};

// Modal Window Markup:
function generateModalWindow() {
    const modal = `
    <div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
            <h3 id="name" class="modal-name cap">name</h3>
            <p class="modal-text">email</p>
            <p class="modal-text cap">city</p>
            <hr>
            <p class="modal-text">(555) 555-5555</p>
            <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
            <p class="modal-text">Birthday: 10/21/2015</p>
        </div>
    </div>
    `;
    body.innerHTML = modal;
};





///// TEST HERE /////
generateSearchBar()

fetchData("https://randomuser.me/api/?results=12")



///// EVENT LISTENERS /////
// employeeCard.addEventListener("click", generateModalWindow);






