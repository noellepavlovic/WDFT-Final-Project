import React, { Component } from 'react';
import RecipeCard from './RecipeCard'

class Recipes extends Component {

    render() {
        return (
            (this.props.recipes.error
                ? <div className="main"></div>
                : <div>
                    {this.props.recipes.map((item, i) =>
                        (item.imageUrlsBySize
                            ? <RecipeCard imgSrc={item.imageUrlsBySize[90]} title={item.recipeName} recSrc={item.sourceDisplayName} id={item.id} key={item.id} />
                            : <RecipeCard imgSrc={item.imgSrc} title={item.recipeName} recSrc={item.sourceDisplayName} id={item.id} key={item.id} />))}
                </div>)
        )
    }
}

export default Recipes;