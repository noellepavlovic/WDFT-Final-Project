import React, { Component } from 'react';
import RecipeCard from './RecipeCard'

class Recipes extends Component {
    
    render() {
        console.log(this.props.recipes)
        return (
            <div>
                {this.props.recipes.map((item, i) => <RecipeCard imgSrc={item.imageUrlsBySize[90]} title={item.recipeName} recSrc={item.sourceDisplayName} 
                id={item.id} course={item.attributes.course} ingredients={item.ingredients} totalTime={item.totalTimeInSeconds} key={item.id}/>)}
            </div>
        )
    }
}

export default Recipes
    


