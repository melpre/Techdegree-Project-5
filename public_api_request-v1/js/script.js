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
        let employeeList = data.results;
        generateEmployeeCard(employeeList);
        console.log(employeeList);
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
        
        //Create div containers for each employee card:
        for (var i=0; i<data.length; i++) {
            const divCard = document.createElement("div");
            divCard[i].className = "card";
            gallery.append(divCard[i]);
        };

        //Loop through fetched data and populate employee card fields:
        data.forEach(item => {
            item +=
                `<div class="card-img-container">
                        <img class="card-img" src="${item.picture.large}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${item.name.first} ${item.name.last}</h3>
                        <p class="card-text">${item.email}</p>
                        <p class="card-text cap">${item.location.city}</p>
                </div>`;
            divCard.innerHTML += item;

            // Add click event listeners to each employee card:
            divCard.addEventListener("click", function(event) {
                event.preventDefault();
                generateModalWindow(item);
            });
        });
    };

    // Modal Window Markup:
    function generateModalWindow(employeeDetail) {
        // Populate the specific user data on to HTML Markup Modal Window
        const modal = `
        <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${employeeDetail.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${employeeDetail.name.first} ${employeeDetail.name.last}</h3>
                <p class="modal-text">${employeeDetail.email}</p>
                <p class="modal-text cap">${employeeDetail.location.city}</p>
                <hr>
                <p class="modal-text">${employeeDetail.phone}</p>
                <p class="modal-text">${employeeDetail.location}</p>
                <p class="modal-text">Birthday: ${employeeDetail.dob.date}</p>
            </div>
        </div>
        `;
        body.innerHTML = modal;
    };




///// EVENT LISTENERS /////

// gallery.addEventListener("click", function(event) {
//     event.preventDefault();

//     if (event.target !== gallery) {
        // Declare variable to hold 'closest' employee card
//         let clicked = event.target.closest("div.card");

//         generateModalWindow(clicked);
//     };
// });










