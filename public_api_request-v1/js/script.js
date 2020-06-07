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

fetchData("https://randomuser.me/api/?results=12&nat=us")
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

        //Loop through fetched data and populate employee card fields:
        data.forEach(item => {
            let divCard = document.createElement("div");
            divCard.className = "card";
            let html = 
                `<div class="card-img-container">
                        <img class="card-img" src="${item.picture.large}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${item.name.first} ${item.name.last}</h3>
                        <p class="card-text">${item.email}</p>
                        <p class="card-text cap">${item.location.city}, ${item.location.state}</p>
                </div>`;
            divCard.innerHTML = html;
            gallery.append(divCard);

            // Click event listeners to each employee card:
            divCard.addEventListener("click", function(event) {
                generateModalWindow(item);
            });
        });
    };

    // Modal Window Markup:
    function generateModalWindow(employeeDetail) {

        // Populate the specific user data on to HTML Markup Modal Window
        let addressStNum = employeeDetail.location.street.number; 
        let addressStName = employeeDetail.location.street.name;
        let addressCity = employeeDetail.location.city;
        let addressState = employeeDetail.location.state;
        let addressPostCode = employeeDetail.location.postcode;
        
        // Convert 'dob' JSON object into a birthdate string:
        function birthday(date) {
            let jsonBirthday = new Date(date);
            let formattedBirthday = jsonBirthday.toLocaleDateString();
            return formattedBirthday;
        };

        // Create div with class "modal-container" hidden by default
        let modalContainer = document.createElement("div");
        modalContainer.className = "modal-container";
        modalContainer.style.display = "none";
        
        let html = `
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${employeeDetail.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${employeeDetail.name.first} ${employeeDetail.name.last}</h3>
                    <p class="modal-text">${employeeDetail.email}</p>
                    <p class="modal-text cap">${employeeDetail.location.city}</p>
                    <hr>
                    <p class="modal-text">${employeeDetail.phone}</p>
                    <p class="modal-text">${addressStNum} ${addressStName}, ${addressCity}, ${addressState} ${addressPostCode}</p>
                    <p class="modal-text">Birthday: ${birthday(employeeDetail.dob.date)}</p>
                </div>
            </div>
        `;

        modalContainer.innerHTML = html;
        body.append(modalContainer);
        modalContainer.style.display = "block";

        // Click event listener on 'X' to close modal window
        const button = document.querySelector("button");
        button.addEventListener("click", function(event) {
            modalContainer.style.display = "none";
        });
    };











