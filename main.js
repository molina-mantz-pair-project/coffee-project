"use strict"

//Removed unnecessary flex elements from the renderCoffee function: March 2 2023
function renderCoffee(coffee) {
    var html = '<div class="coffee mb-5">';
    html += '<h2>' + coffee.name + '</h2>';
    html += '<p class="fs-6">' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

//RETURNS ELEMENTS WITH SELECTED ROASTS AND DISPLAYS THEM FROM BOTTOM TO TOP:
function renderCoffees(coffees) {
    var html = '';
    for(var i = 0; i <= coffees.length -1; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

// SEARCHES FOR THE SELECTED ROAST USING FOR EACH LOOP:
function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value; //This will equal either 'light' 'medium' 'dark' or 'all'
    var filteredCoffees = [];

    if (selectedRoast === 'all') {
        filteredCoffees=coffees;
    } else {
        coffees.forEach(function(coffee) {
            if (coffee.roast === selectedRoast) {
                filteredCoffees.push(coffee);

            }
        })
    };
    tbody.innerHTML = renderCoffees(filteredCoffees);
    //Added function to activate event listeners upon filtering <select> elements:
    //This is a LOCAL function that matches the data of the global function which adds listeners to ALL by default.
    //The downside is that this requires more code, but attempts at using a 'change' listener on the <select> failed.
    //For purposes of styling, this must match the values of the global function.
    //If there's a change to one, there must be a change to the other.
    //But...it works.
    var coffeeClick = document.querySelectorAll('.coffee');
    coffeeClick.forEach(function (coffee){
        coffee.addEventListener('click', addToCart)
        coffee.addEventListener('mouseover', divBackgroundChange)
        coffee.addEventListener('mouseout', divBackgroundNormal)
    });
}

window.onload = function() {
    document.getElementById('roast-selection').value = 'all';

    updateCoffees();
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

//Add function to search coffee selection by name; display matching coffees as the user types:
function searchByName () {

    var inputValueByName = document.getElementById("search-by-name").value.toLowerCase();
    //The .filter method is an iterative method that creates a shallow copy of an array for values that meet the criteria of the function:
    var coffeeFilter = [];
    coffees.filter(function (coffee) {
        if (coffee.name.toLowerCase().includes(inputValueByName)) {
            coffeeFilter.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(coffeeFilter);
    //Added function to activate event listeners upon filtering <input> elements:
    //This is a LOCAL function that matches the data of the global function which adds listeners to ALL by default.
    //The downside is that this requires more code, but attempts at using a 'change' listener on the <select> failed.
    //For purposes of styling, this must match the values of the global function.
    //If there's a change to one, there must be a change to the other.
    //But...it works.
    var coffeeClick = document.querySelectorAll('.coffee');
    coffeeClick.forEach(function (coffee){
        coffee.addEventListener('click', addToCart)
        coffee.addEventListener('mouseover', divBackgroundChange)
        coffee.addEventListener('mouseout', divBackgroundNormal)
    });
}

var tbody = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
tbody.innerHTML = renderCoffees(coffees);
submitButton.addEventListener('click', updateCoffees);


//Add event listeners to ALL dynamically created div elements:
var coffeeClick = document.querySelectorAll('.coffee');
coffeeClick.forEach(function (coffee){
    coffee.addEventListener('click', addToCart)
    coffee.addEventListener('mouseover', divBackgroundChange)
    coffee.addEventListener('mouseout', divBackgroundNormal)
})

//Adding functions that are associated with event listeners of the dynamically created <div> elements:
//These functions apply to dynamically created <div> elements in three places above:
//These include the 'all', <select>, and <input> functions.

//The function 'addToCart' grabs data from the dynamically created <div> element,
//pushes it to an unordered list, and displays to the user on the HTML:
function addToCart (event){
    var coffeeDiv = event.target.closest("div");

    //THIS CREATES A NEW LIST ITEM FOR THE COFFEE SELECTION:
    var liCoffeeSelection = document.createElement("li");
    liCoffeeSelection.textContent = coffeeDiv.querySelector("h2").textContent + ', ' + coffeeDiv.querySelector("p").textContent + ' roast';

    //This adds the new the coffee selection list item to the UL (e.g. shopping cart)
    var cart = document.getElementById("cart");
    cart.appendChild(liCoffeeSelection);

    //THIS BLOCK OF VARIABLES CREATES A NEW LIST ITEM WITH A DROPDOWN MENU
    //THAT ALLOWS USERS TO MAKE AN IN-LINE CREAM SELECTION:
    var liCreams = document.createElement("li");
    liCreams.textContent = "Select your cream ------>";

    //This creates a dropdown menu to hold the cream selections:
    var dropdownCreams = document.createElement("select");

    //The following variables create the content for the cream options:
    var creamChoice1 = document.createElement("option");
    creamChoice1.text = "Organic Heavy Cream";
    dropdownCreams.add(creamChoice1);

    var creamChoice2 = document.createElement("option");
    creamChoice2.text="Organic Whole Milk";
    dropdownCreams.add(creamChoice2);

    var creamChoice3 = document.createElement("option");
    creamChoice3.text="Organic Half & Half";
    dropdownCreams.add(creamChoice3);

    //This appends the dropdown menu to the list item:
    liCreams.appendChild(dropdownCreams);

    //This appends the list item to the unordered list (e.g. shopping cart):
    cart.appendChild(liCreams);

    //THIS BLOCK OF VARIABLES CREATES A NEW LIST ITEM WITH A DROPDOWN MENU
    //THAT ALLOWS USERS TO MAKE AN IN-LINE SWEETENER SELECTION:

    var liSweeteners = document.createElement('li');
    liSweeteners.textContent = "Select your sweetener -->"

    //This creates a dropdown menu to hold the sweetener variables:
    var dropdownSweeteners = document.createElement('select');

    //The following variables create the content for the sweetener options:
    var sweetener1 = document.createElement('option');
    sweetener1.text = "Organic Cane Sugar"
    dropdownSweeteners.add(sweetener1);

    var sweetener2 = document.createElement('option');
    sweetener2.text = "Organic Maple Syrup";
    dropdownSweeteners.add(sweetener2);

    var sweetener3 = document.createElement('option');
    sweetener3.text = "Organic White Honey"
    dropdownSweeteners.add(sweetener3);

    //This appends the sweeteners dropdown menu to the list item:
    liSweeteners.appendChild(dropdownSweeteners);

    //This appends the list item to the unordered list (e.g. shopping cart):
    cart.appendChild(liSweeteners);


}

function divBackgroundChange () {
    this.style.backgroundColor = '#F0E6E6';
    this.style.width = '220px';
    this.style.height = '112px';
    this.style.borderRadius = '12px';
    this.style.padding = '7px';
}

function divBackgroundNormal () {
    this.style.backgroundColor = 'white';
    this.style.width = '208px';
    this.style.height = '98.4px';
    this.style.padding = '0px';

}

//This section of code plays the embedded video when the user hovers their mouse over the video:
var playCoffeeVideo = document.getElementById('coffee-video');
function playVideoOnHover () {
    playCoffeeVideo.play();
}

playCoffeeVideo.addEventListener('mouseover', playVideoOnHover);

//This section of code stops the embedded video when the use's mouse leave the video:
var stopCoffeeVideo = document.getElementById('coffee-video');

function stopVideoOnMouseOut () {
    stopCoffeeVideo.pause();
}

stopCoffeeVideo.addEventListener('mouseout', stopVideoOnMouseOut)





