//------------------------ DATA -------------------------

/*Due to large amounts of data, the state array is filled later.*/
let state = [];

/*Helper function to create food items.*/
function createFoodItem(nutritionalInfo, /*Array of up to two descriptors: High Protein, Low Fat, or Low Carbs.*/
                        foodName,
                        timeServed, /*0 for Breakfast, 1 for Lunch, 2 for Dinner.*/
                        calories,
                        servingSize,
                        gramsProtein,
                        gramsCarbs,
                        gramsFat,
                        dietaryInfo, /*Array of up to four dietary descriptors.*/
                        allergens,
                        station, /*0 for The Kitchen Table, 1 for The Grill, 2 for Plant Forward, and 3 for Waffle Bar.*/
                        stateIndex
                    )
{
    return {
        nutritionalInfo,
        foodName,
        timeServed,
        calories,
        servingSize,
        gramsProtein,
        gramsCarbs,
        gramsFat,
        dietaryInfo,
        allergens,
        station,
        stateIndex
    };
}

/*Used AI to create a bunch of food items with realistic information.*/
// The Kitchen Table Station (0)
state.push(createFoodItem(["Low Fat"], "Grilled Chicken Breast", 1, 165, "3.5 oz", 31, 0, 3.6, ["Halal", "Gluten Free"], "", 0, state.length));
state.push(createFoodItem(["High Protein"], "Turkey Meatballs", 1, 190, "3 oz", 23, 8, 8, ["Gluten Free"], "", 0, state.length));
state.push(createFoodItem(["Low Carbs"], "Roasted Salmon", 2, 280, "3.5 oz", 25, 0, 17, ["Gluten Free"], "Fish", 0, state.length));
state.push(createFoodItem(["Low Fat"], "Quinoa Salad", 1, 220, "1 cup", 8, 35, 7, ["Vegan", "Gluten Free"], "", 0, state.length));
state.push(createFoodItem([], "Steamed Broccoli", 1, 55, "1 cup", 3.7, 11, 0.6, ["Vegan", "Gluten Free"], "", 0, state.length));

// The Grill Station (1)
state.push(createFoodItem(["High Protein"], "Grilled Hamburger", 1, 354, "3.5 oz patty", 25, 0, 28, [], "Dairy, Wheat", 1, state.length));
state.push(createFoodItem(["Low Fat"], "Grilled Hot Dog", 1, 155, "1 hot dog", 6, 2, 14, [], "Dairy, Wheat", 1, state.length));
state.push(createFoodItem([], "Grilled Steak", 2, 271, "3 oz", 26, 0, 18, ["Gluten Free"], "", 1, state.length));
state.push(createFoodItem(["High Protein"], "Chicken Kabob", 1, 195, "1 skewer", 28, 4, 8, ["Gluten Free"], "", 1, state.length));
state.push(createFoodItem([], "BBQ Pulled Pork", 1, 340, "4 oz", 23, 18, 21, [], "Wheat, Soy", 1, state.length));

// Plant Forward Station (2)
state.push(createFoodItem(["Low Fat"], "Vegetable Stir-Fry", 1, 180, "1.5 cups", 6, 28, 4, ["Vegan", "Gluten Free"], "Soy", 2, state.length));
state.push(createFoodItem(["High Protein"], "Chickpea Curry", 2, 310, "1 cup", 12, 42, 7, ["Vegan"], "", 2, state.length));
state.push(createFoodItem(["Low Carbs"], "Cauliflower Rice", 1, 25, "1 cup", 2, 5, 0.3, ["Vegan", "Gluten Free"], "", 2, state.length));
state.push(createFoodItem([], "Lentil Soup", 2, 230, "1.5 cups", 18, 38, 1.5, ["Vegan"], "", 2, state.length));
state.push(createFoodItem(["Low Fat"], "Grilled Veggie Burger", 1, 240, "1 burger", 12, 29, 8, ["Vegan"], "Wheat, Soy", 2, state.length));

// Waffle Bar Station (3)
state.push(createFoodItem(["High Protein"], "Belgian Waffles with Berries", 0, 310, "1 waffle", 9, 48, 11, ["Vegetarian"], "Eggs, Dairy, Wheat", 3, state.length));
state.push(createFoodItem([], "Chocolate Chip Waffles", 0, 380, "1 waffle", 8, 52, 16, ["Vegetarian"], "Eggs, Dairy, Wheat, Soy", 3, state.length));
state.push(createFoodItem(["Low Fat"], "Strawberry Waffles", 0, 280, "1 waffle", 7, 46, 8, ["Vegetarian"], "Eggs, Dairy, Wheat", 3, state.length));
state.push(createFoodItem([], "Buttermilk Waffles", 0, 320, "1 waffle", 8, 50, 10, ["Vegetarian"], "Eggs, Dairy, Wheat", 3, state.length));
state.push(createFoodItem(["Low Carbs"], "Whole Wheat Waffles", 0, 250, "1 waffle", 10, 38, 8, ["Vegetarian"], "Eggs, Dairy, Wheat", 3, state.length));

//------------------------ DISPLAY -------------------------

//Instantiating various parts of the site for later use.
const listView = document.getElementById("list-view");
const foodView = document.getElementById("food-view");
const nutritionBar = document.getElementById("nutrition-bar");
const dietaryCard = document.getElementById("dietary-card");
const dietaryBar = document.getElementById("dietary-bar");
const allergensCard = document.getElementById("allergens-card");

const theKitchenTable = document.getElementById("the-kitchen-table");
const theGrill = document.getElementById("the-grill");
const plantForward = document.getElementById("plant-forward");
const waffleBar = document.getElementById("waffle-bar");

const exitBtn = document.getElementById("exit-btn");

//Standard render function. Swaps between the two mains, food-view or list-view,
//depending on if the user is currently selecting a food item to avoid completely
//reloading the page.
function render()
{
    if (isOnFoodView) //If user is currently selecting a food item.
    {
        createHeading();
        createNutritionBar();
        document.getElementById("food-name").textContent = currentFood.foodName;
        createTimeServed();
        document.getElementById("calories").textContent = currentFood.calories;
        document.getElementById("serving-size").textContent = currentFood.servingSize;
        document.getElementById("protein-num").textContent = currentFood.gramsProtein;
        document.getElementById("carbs-num").textContent = currentFood.gramsCarbs;
        document.getElementById("fat-num").textContent = currentFood.gramsFat;
        createDietaryCard();
        createAllergensCard();
    }
    else //If user is looking at the wider list of options.
    {
        clearStations();
        for (let food of state)
        {
            addFood(food);
        }
    }
}

//------------------------ HELPERS -------------------------

//Adds food items to the wider list depending on their station.
function addFood(food)
{
    let station = getStation(food);
    let button = document.createElement("button");
    button.classList.add("card");
    button.classList.add("food-item");
    button.addEventListener('click', function() {
        currentFood = state[food.stateIndex];
        switchToFoodView();
    })
    let foodHeading = document.createElement("strong");
    let foodSpan = document.createElement("span");
    foodSpan.textContent = food.foodName;
    foodHeading.appendChild(foodSpan);
    button.appendChild(foodHeading);
    let calBox = document.createElement("span");
    let calNum = document.createElement("strong");
    let calText = document.createElement("span");
    calText.classList.add("blue-text");
    calText.textContent = food.calories;
    calNum.appendChild(calText);
    let calLabel = document.createElement("span");
    calLabel.classList.add("gray-text");
    calLabel.textContent = " kcal";
    calBox.appendChild(calNum);
    calBox.appendChild(calLabel);
    button.appendChild(calBox);
    station.appendChild(button);
}

//Gets the station of a food item using the station property.
function getStation(food)
{
    if (food.station === 0) {
        return theKitchenTable;
    }
    else if (food.station === 1) {
        return theGrill;
    }
    else if (food.station === 2) {
        return plantForward;
    }
    else {
        return waffleBar;
    }
}

//Clears all stations before rendering.
function clearStations()
{
    theKitchenTable.innerHTML = "";
    theGrill.innerHTML = "";
    plantForward.innerHTML = "";
    waffleBar.innerHTML = "";
}

//Creates the station heading for the food item at the very top of the card.
function createHeading()
{
    let i = currentFood.station;
    let heading = document.getElementById("station");
    if (i === 0) {
        heading.textContent = "The Kitchen Table";
    }
    else if (i === 1) {
        heading.textContent = "The Grill";
    }
    else if (i === 2) {
        heading.textContent = "Plant Forward";
    }
    else {
        heading.textContent = "Waffle Bar";
    }

}

//Fills in the nutrition bar with the nutritionalInfo parameter.
function createNutritionBar()
{
    nutritionBar.innerHTML = "";
    let nutritionHeader = document.createElement("div");
    nutritionHeader.classList.add("nutrition-info");
    nutritionHeader.classList.add("bg-blue-100");
    let strong = document.createElement("strong");
    strong.textContent = "NUTRITIONAL DETAILS";
    nutritionHeader.appendChild(strong);
    nutritionBar.appendChild(nutritionHeader);

    for (let i = 0; i < Math.min(currentFood.nutritionalInfo.length, 2); i++) /*only considers first two pieces of nutritional info*/
    {
        let detail = document.createElement("div");
        detail.classList.add("nutrition-info");
        let info = currentFood.nutritionalInfo[i].toUpperCase();
        if (info === "HIGH PROTEIN") {
            detail.classList.add("bg-green-100");
        }
        else if (info === "LOW CARBS") {
            detail.classList.add("bg-yellow-100");
        }
        else if (info === "LOW FAT") {
            detail.classList.add("bg-red-100");
        }
        let strong = document.createElement("strong");
        strong.textContent = currentFood.nutritionalInfo[i].toUpperCase();
        detail.appendChild(strong);
        nutritionBar.appendChild(detail);
    }
}

//Uses the timeServed property to say whether the item is served at Breakfast, Lunch, or Dinner.
function createTimeServed()
{
    let meal = document.getElementById("time-served");
    if (currentFood.timeServed === 0) {meal.textContent = "BREAKFAST (7AM-11AM)";}
    else if (currentFood.timeServed === 1) {meal.textContent = "LUNCH (11AM-3PM)";}
    else {meal.textContent = "DINNER (5PM-8:30PM)";}
}

//Creates the dietary card using the dietary information provided in the dietaryInfo parameter.
function createDietaryCard()
{
    dietaryBar.innerHTML = "";
    dietaryCard.classList.add("hidden");
    if (currentFood.dietaryInfo.length !== 0) {
        dietaryCard.classList.remove("hidden");
        for (let i = 0; i < Math.min(currentFood.dietaryInfo.length, 4); i++) /*only considers first four pieces of dietary info*/
        {
            let detail = document.createElement("div");
            detail.classList.add("dietary-info");
            let strong = document.createElement("strong");
            strong.textContent = currentFood.dietaryInfo[i];
            detail.appendChild(strong);
            dietaryBar.appendChild(detail);
        }
    }
}

//Creates the allergens card using the allergens parameter.
function createAllergensCard()
{
    allergensCard.classList.add("hidden");
    let currentAllergens = currentFood.allergens;
    if (currentAllergens.trim() !== "") {
        allergensCard.classList.remove("hidden");
        document.getElementById("allergens").textContent = currentAllergens;
    }
}

//Switches to the food view for when the user selects a food item from the list.
function switchToFoodView()
{
    foodView.classList.remove("hidden");
    listView.classList.add("hidden");
    isOnFoodView = true;
    render();
}

//Switches back to the list view when the user presses the exit button in food view.
function switchToListView()
{
    foodView.classList.add("hidden");
    listView.classList.remove("hidden");
    isOnFoodView = false;
    render();
}

//------------------------ INITIALIZATION -------------------------

let currentFood = state[0]; //Sets currentFood to an arbitrary food.
exitBtn.addEventListener('click', switchToListView); //Adds event listener to the exit button.

switchToListView(); //Initializes in list view.
render();
