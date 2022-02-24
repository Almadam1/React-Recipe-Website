import React,{useEffect,useState} from 'react';
import './App.css';
import Recipe from './Recipe'
import mealType from './MealType'
import Info from './Info'
import Navbar from './components/Navbar'

const App = ()=>{

  const [id,key] = Info();
  const [recipes,setRecipes] = useState([]);
  const [search,setSearch] = useState('');
  const [query,setQuery] = useState('rice');

  const [mealType,setMealType] = useState('')
  const [ingr,setIngr] = useState('')
  const [cuisineType,setCuisineType] = useState('')
  const [health,setHealth] = useState('')

  useEffect(()=>{
    getHealth();
  },[null]);

  const getHealth = async ()=>{
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=aa060bf604aa4c61b037a8eb2d794abc&type=${health}&addRecipeNutrition=true`);
    const data = await response.json();
    setHealth(data.hits);
    console.log(data);
  }
  

  useEffect(()=>{
    getRecipes();
  },[query]);

  const getIngr = async ()=>{
    const response = await fetch(`https://api.edamam.com/search?q=${ingr}&app_id=${id}&app_key=${key}`);
    const data = await response.json();
    setIngr(data.hits);
  }

  useEffect(()=>{
    getIngr();
  },[null]);

  const getRecipes = async ()=>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${id}&app_key=${key}`);
    const data = await response.json();
    setRecipes(data.hits);
    
  }

  useEffect(()=>{
    getMealType();
  },[null]);

  const getMealType = async ()=>{
    const response = await fetch(`https://api.edamam.com/search?q=${mealType}&app_id=${id}&app_key=${key}`);
    const data = await response.json();
    setMealType(data.hits);
  }

  useEffect(()=>{
    getCuisineType();
  },[null]);

  const getCuisineType = async ()=>{
    const response = await fetch(`https://api.edamam.com/search?q=${cuisineType}&app_id=${id}&app_key=${key}`);
    const data = await response.json();
    setCuisineType(data.hits);
  }

  const updateSearch = e =>{
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className = "App">
      <Navbar />
      <div className ="App-header"> You can search for Food based on Meal Type (Breakfast, Lunch, Dinner) Cuisine Type (Italian, Mexican, European) Diet Type (Vegan, Kosher, Halal) and by Ingredients
      </div>
      <form onSubmit={getSearch} className = "search-form">
        <input className = "search-bar" type = "text" value = {search} onChange = {updateSearch} placeholder = "Generate Meal"/>
        <button className = "search-button" type = "submit">Search</button>
      </form>
      <div className = "recipes">
        {recipes.map(recipe =>(
          <Recipe 
                  key = {recipe.recipe.label}
                  title = {recipe.recipe.label} 
                  calories = {recipe.recipe.calories} 
                  image = {recipe.recipe.image}
                  ingredients = {recipe.recipe.ingredients}
                  
                  
          />
        ))}
      </div>
      <div>
    </div>

    </div>
      
 
  )
}


export default App;
