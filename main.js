"use strict"

//Removed unnecessary flex elements from the renderCoffee function: March 2 2023
function renderCoffee(coffee) {
    var html = '<div class="coffee mb-5">';
    html += '<h2>' + coffee.name + '</h2>';
    html += '<p>' + coffee.roast + '</p>';
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
    //Added function to activate event listeners upon filtering: This is a local function that matches the global function that adds listeners to all by default. The downside is that its more code and it has to match the global function, so if there's a change it must be updated in multiple places. But...it works.
    var coffeeClick = document.querySelectorAll('.coffee');
    coffeeClick.forEach(function (coffee){
        coffee.addEventListener('click', addToCart)
        coffee.addEventListener('mouseover', divBackgroundChange)
        coffee.addEventListener('mouseout', divBackgroundNormal)
    })
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

//attempt to resolve forms listener issue:
//document.getElementById('roast-selection').addEventListener('change', renderCoffee);

function addToCart (){
    alert("You've added a coffee");
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






