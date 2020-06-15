/* Treehouse FSJS Techdegree
 * Project 5 - Public API Requests App
 * script.js */


/* Extra Credit Tasks:
1. Lines 57-89 Search bar function
2. Lines 162-219 Toggle "previous" & "next" buttons in modal window
3. Style changes (background and box shadows) made in styles.css file
*/



///// GLOBAL VARIABLES /////

// DOM
const searchContainer = document.querySelector(".search-container");
const gallery = document.querySelector("#gallery");
const body = document.querySelector("body");

// Data
let employeeList;



///// FETCH FUNCTIONS /////

function fetchData(url) {
    return fetch(url)
        .then(response => response.json())
};

fetchData("https://randomuser.me/api/?results=12&nat=us")
    .then(data => {
        employeeList = data.results;
        generateEmployeeCard(employeeList);
        generateSearchBar(employeeList);
        console.log(employeeList);
    });



///// HELPER FUNCTIONS /////

    // Search Bar Markup:
    function generateSearchBar(data) {
        // Build search bar elements
        const searchForm = document.createElement("form");
        searchForm.action = "#";
        searchForm.method = "get";
        const searchBar = `
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        `;
        searchContainer.append(searchForm);
        searchForm.innerHTML = searchBar;

        // EXTRA CREDIT:
        // Variables to reference search elements
        const search = document.getElementById("search-input");
        const submit = document.getElementById("search-submit");

        // Variables to hold HTML collections of employees:
        let divs = document.getElementsByClassName("card");
        let employeeNames = document.querySelectorAll("h3");

        // Function to execute search (source: https://www.w3schools.com/howto/howto_js_filter_lists.asp)
        function nameSearch (searchInput, cards, names, data) {
            for (let i=0; i<cards.length; i++) {
                let nameTxt = names[i].textContent || names[i].innerHTML;
                if (nameTxt.toLowerCase().indexOf(searchInput.value) > -1) {
                    cards[i].style.display = "";

                    
                    // Filter employee data for employees that are displayed as search results
                    let displayed = data.filter(item => {
                        if (item.name.first.toLowerCase() || item.name.last.toLowerCase().includes(searchInput.value.toLowerCase())) {
                            return item;
                        };
                    });


                    console.log(displayed);
                } else {
                    cards[i].style.display = "none";
                };        
            };         
        };

        // Event listener for search submit button:
        submit.addEventListener("click", (event) => {
            event.preventDefault();
            nameSearch(search, divs, employeeNames, employeeList);
        });

        // Event listener for search input:
        search.addEventListener("keyup", (event) => {
            event.preventDefault();
            nameSearch(search, divs, employeeNames, employeeList);
        });
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

            // Event listeners to each employee card:
            divCard.addEventListener("click", (event) => {
                event.preventDefault();
                populateModalWindow(item, data);
            });
        });
    };


    // Modal Window Markup:
    function populateModalWindow(employeeDetail, employees) {
        function createModal(detail) {
            // Store employee's address data for HTML markup
            let addressStNum = detail.location.street.number; 
            let addressStName = detail.location.street.name;
            let addressCity = detail.location.city;
            let addressState = detail.location.state;
            let addressPostCode = detail.location.postcode;
        
            // Convert 'dob' JSON object into birthdate string:
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
                        <img class="modal-img" src="${detail.picture.large}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${detail.name.first} ${detail.name.last}</h3>
                        <p class="modal-text">${detail.email}</p>
                        <p class="modal-text cap">${detail.location.city}</p>
                        <hr>
                        <p class="modal-text">${detail.phone}</p>
                        <p class="modal-text">${addressStNum} ${addressStName}, ${addressCity}, ${addressState} ${addressPostCode}</p>
                        <p class="modal-text">Birthday: ${birthday(employeeDetail.dob.date)}</p>
                    </div>
                </div>
            `;
            modalContainer.innerHTML = html;
            body.append(modalContainer);

            // EXTRA CREDIT:
            // Create div for modal toggle buttons
            const modalToggle = document.createElement("div");
            modalToggle.className = "modal-btn-container";
            const toggleButtons = `
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            `;
            modalToggle.innerHTML = toggleButtons;
            modalContainer.append(modalToggle);

            // Display completed modal window
            modalContainer.style.display = "block";

            // Event Listeners
            // Click 'X' to close modal window
            const button = document.querySelector("button");
            const modal = document.querySelector("div.modal-container");
            button.addEventListener("click", function(event) {
                modal.remove();
            });
            
            // Click 'Prev' and 'Next' buttons
            // Declare variables to reference button elements
            const prev = document.getElementById("modal-prev");
            const next = document.getElementById("modal-next");

            // "Prev" button
            prev.addEventListener("click", function(event) {
                event.preventDefault();
                // Declare variables to reference current employee detail in modal window and previous employee detail in array
                let currentIndex = employees.indexOf(detail);
                let previous = employees[currentIndex - 1];
                let previousIndex = employees.indexOf(previous);
                // Remove current modal window that is open
                modal.remove();
                // Generate new modal window with "previous" employee's details
                if (currentIndex > previousIndex && previousIndex > -1) {
                    createModal(previous);
                } else {
                    body.append(modal);
                };
            });

            // "Next" button
            next.addEventListener("click", function(event) {
                event.preventDefault();
                // Declare variables to reference current employee detail in modal window and previous employee detail in array
                let currentIndex = employees.indexOf(detail);
                let next = employees[currentIndex + 1];
                let nextIndex = employees.indexOf(employees[currentIndex + 1])
                // Remove current modal window that is open
                modal.remove();
                // Generate new modal window with "next" employee's details
                if (nextIndex < 12 && nextIndex > currentIndex) {
                    createModal(next);
                } else {
                    body.append(modal);
                };
            });
        };

        // Callback function
        createModal(employeeDetail);
    };



// Extra Credit //
///// STYLE CHANGES ---> see styles.css /////