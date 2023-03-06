"use strict"

//THIS FUNCTION GENERATES DYNAMICALLY-CREATED <DIV> ELEMENTS:
function renderCoffee(coffee) {
    var html = '<div class="coffee mb-5">';
    html += '<h2>' + coffee.name + '</h2>';
    html += '<p class="fs-6">' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

//THIS FUNCTION CAPTURES THE ELEMENTS ASSOCIATED WITH THE SELECTED ROAST AND DISPLAYS THEM IN ASCENDING ORDER BY ID:
function renderCoffees(coffees) {
    var html = '';
    for(var i = 0; i <= coffees.length -1; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

//THIS FUNCTION FILTERS FOR THE SELECTED ROAST USING FOR-EACH LOOP:
function updateCoffees(e) {
    //This restricts the form to updating results locally:
    e.preventDefault();
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];

    if (selectedRoast === 'all') {
        filteredCoffees=coffees;
    } else {
        coffees.forEach(function(coffee) {
            if (coffee.roast === selectedRoast) {
                filteredCoffees.push(coffee);

            }
        })
    }
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

//THIS FUNCTION ENSURES THAT ALL COFFEE <DIV> ELEMENTS ARE DISPLAYED AND FUNCTIONAL BEFORE JS EXECUTES:
window.onload = function() {
    document.getElementById('roast-selection').value = 'all';

    updateCoffees();
}

//THIS IS THE PRIMARY ARRAY USED FOR THIS PROJECT:
//SOURCE: http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
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

//THE 'SEARCH BY NAME' FUNCTION FILTERS COFFEE SELECTIONS BY NAME AND DISPLAYS THEM AS THE USER TYPES:
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

//THE ADD TO CART FUNCTION GRABS DATA FROM THE DYNAMICALLY CREATED DIV ELEMENTS,
//PUSHES IT TO AN UNORDERED LIST AND DISPLAYS IT TO THE USER ON HTML:
function addToCart (event){
    var cart = document.getElementById("cart");
    var coffeeDiv = event.target.closest("div");
    alert("Added to cart! Don't forget to select your creams and sweeteners!");

    //THIS CREATES A NEW LIST ITEM FOR THE COFFEE SELECTION:
    var liCoffeeSelection = document.createElement("li");
    liCoffeeSelection.textContent = coffeeDiv.querySelector("h2").textContent + ', ' + coffeeDiv.querySelector("p").textContent + ' roast';

    //This adds the new the coffee selection list item to the UL (e.g. shopping cart)
    //var cart = document.getElementById("cart");  //REMOVED
    cart.appendChild(liCoffeeSelection);

    //THIS BLOCK OF VARIABLES CREATES A NEW LIST ITEM WITH A DROPDOWN MENU
    //WHICH ALLOWS USERS TO MAKE AN IN-LINE CREAM SELECTION:
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
    //WHICH ALLOWS USERS TO MAKE AN IN-LINE SWEETENER SELECTION:

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


    //THIS FUNCTION, WHEN CALLED BY SUBMIT, ITERATES THROUGH THE UNORDERED LIST (E.G. SHOPPING CART) AND COUNTS THE TOTAL NUMBER OF LIST ITEMS:
    //THEN, THE TOTAL NUMBER OF LIST ITEMS IS DIVIDED BY THREE ('3'), WHICH GIVES US THE TOTAL NUMBER OF COFFEES THAT WERE SELECTED BY THE USER:
    //SINCE ALL COFFEES ARE PRICED ARE FIXED AT $5.00, WE CAN THEN MULTIPLY THE RESULT BY FIVE ('5') AND RETURN A TOTAL PRICE TO THE USER:
    function calculateTotal () {
        var cartList = document.querySelector('ol');
        //var numListItems = cartList.getElementsByTagName('li').length;
        var numListItems = cartList.querySelectorAll('li').length;
        var chargeableItems = (numListItems/3)*5;
        var chargeableItemsValue = chargeableItems.toFixed(2);
        var userTotal = document.getElementById('output');
        userTotal.innerHTML = chargeableItemsValue;
    }
    calculateTotal();
}

//THE FOLLOWING BLOCK OF CODE CAPTURES DATA FROM THE USERS SHOPPING CART (ID='CART'),
//AND SENDS IT TO THE REQUEST INSPECTOR ENDPOINT TO GENERATE A TEST EVENT:

//This variable grabs <ol> that contains coffee data, cream, sweetener <li>'s;
var cartList = document.getElementById('cart');

//This variable grabs the form itself and is needed to talk to Request Inspector using a POST method;
var shoppingCartForm = document.getElementById('shopping-cart-form');

//This function activates the Checkout button:
shoppingCartForm.addEventListener('submit', function(event) {
    console.log("Form Submitted");

    //This creates an empty array which is populated with list-items are they are iterated:
    var dataCoffee = [];

    //This grabs all targeted list-items in the cart:
    var numListItems = cartList.getElementsByTagName('li');
    console.log(numListItems);

    //This function iterates through every list-item:
    for (let i=0; i < numListItems.length; i++) {
        console.log(`Processing item ${i}`);
        var listItem = numListItems[i];

        //This grabs the Coffee Data (Name and Roast) as a string:
        var inputText = listItem.textContent;

        dataCoffee.push(inputText);
    }
    //This block of code translates the data to JSON and appends it to an element that is pushed to the endpoint:
    var dataInput = document.createElement("input"); //Original
    dataInput.setAttribute("type", "hidden"); //Original
    dataInput.setAttribute("name", "list-data"); //Original
    dataInput.setAttribute("value", JSON.stringify(dataCoffee)); //Original
    shoppingCartForm.appendChild(dataInput); //Original

    //This calls the submit button function:
    event.preventDefault();
    shoppingCartForm.submit();

    //This alerts the user that their order has been received:
    alert("Your order is being prepared! Thank you!")
})

//THE FOLLOWING FUNCTIONS ARE ASSOCIATED WITH EVENT LISTENERS FOR THE DYNAMICALLY-CREATED <DIV> ELEMENTS
//THESE INCLUDE THE 'ALL', <SELECT>, AND INPUT FUNCTIONS:
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

//THE FOLLOWING FUNCTIONS ARE ASSOCIATED WITH EVENT LISTENERS FOR THE VIDEO:

//This section of code plays the embedded video when the user hovers their mouse over the video:
var playCoffeeVideo = document.getElementById('coffee-video');
function playVideoOnHover () {
    playCoffeeVideo.play();
}
playCoffeeVideo.addEventListener('mouseover', playVideoOnHover);

//This section of code stops the embedded video from playing when the use's mouse leave the video:
var stopCoffeeVideo = document.getElementById('coffee-video');

function stopVideoOnMouseOut () {
    stopCoffeeVideo.pause();
}
stopCoffeeVideo.addEventListener('mouseout', stopVideoOnMouseOut)




