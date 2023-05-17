let displayCount = 6
let allMealsDisplayed = false

const defaultLoadMeals = () => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s`
  fetch(url)
    .then(res => res.json())
    .then(data => {
      displayMeals(data.meals.slice(0, displayCount))
     
    })
    
}


const loadMeals = (searchText) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
  fetch(url)
    .then(res => res.json())
    .then(data =>{ 
      allMealsDisplayed =false
      displayMeals(data.meals.slice(0, displayCount))
    }
      )
     

}


const showAllMeals = ()=> {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayMeals(data.meals));
    allMealsDisplayed = true
};


const displayMeals = (meals) => {
  const foodContainer = document.getElementById('food-container')
  foodContainer.innerHTML = '';
  meals.forEach(meal => {
    const mealDiv = document.createElement('div')
    mealDiv.classList.add('card', 'p-0')
    mealDiv.setAttribute("style", "max-width: 500px;")
    mealDiv.innerHTML = `
                 <div class="row g-0">
                      <div class="col-md-4">
                        <img src="${meal.strMealThumb}" class="img-fluid rounded" style="
                        height: 100%">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title fw-semibold">${meal.strMeal}</h5>
                          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                          <a onclick= "loadMealsDetails()" type="button" class="fw-semibold text-warning text-decoration-underline"                       data-bs-toggle="modal" data-bs-target="#mealsDetailsModal">
                        View Details
                        </a>
                        </div>
                      </div>
                    </div>
                </div>
        `
    foodContainer.appendChild(mealDiv)
    
  })

  if(!allMealsDisplayed && meals.length >= displayCount){
    const showAllButton = document.createElement('button')
    showAllButton.textContent="Show All"
    showAllButton.classList.add('btn', 'btn-warning', 'my-5')
    showAllButton.addEventListener('click', showAllMeals)
    foodContainer.appendChild(showAllButton)
  }
}

 
  
  

const searchMeals = () => {
  const inputValue = document.getElementById('input-field').value
  document.getElementById('input-field').value = "";
  if (inputValue) {
    loadMeals(inputValue)

  }
  else {
    alert("Input value can't be empty")
  }

}
defaultLoadMeals()