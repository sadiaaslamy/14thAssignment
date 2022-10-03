const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  meals = document.getElementById("meals"),
 heading = document.getElementById("heading");
function searchMeal(MEAL) {
  MEAL.preventDefault();
 heading.innerHTML = "";
  const term = search.value;
  console.log(term);
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
       heading.innerHTML = `<h2>Search results for '${term}':</h2>`;
        if (data.meals === null) {
         heading.innerHTML = `<p>There are no search results. Try again!</p>`;
        } else {
          meals.innerHTML = data.meals
            .map(
              (meal) => `
            <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="meal-info" data-mealID="${meal.idMeal}">
            <h2>${meal.strMeal}</h2></div>
            <p>Cooking Instructions :${meal.strInstructions.slice(0, 180)}</p>
            </div>`
            )
            .join("");
        }
      });
    search.value = "";
  } else {
    alert("Please enter a search term");
  }
}
submit.addEventListener("submit", searchMeal);
