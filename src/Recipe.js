import React from 'react'
import style from './Recipe.module.css'
const Recipe = ({title,calories,image,ingredients})=>{
    return(
        <div className = {style.recipe}>
            <h1>{title}</h1>
            <ol>
                {ingredients.map(ingredient => (
                    <li>{ingredient.text}</li>
                ))}
            </ol>
            <p className = {style.cal}>Calories: {parseInt(calories).toFixed()} cal</p>
            <img className = {style.image} src = {image} alt = "" />
        </div>
    )
}

export default Recipe;