import React, { Component } from 'react';


class Recipes extends Component {
    
    componentWillMount(){
        this.props.getRecipe(this.props.match.params.recipeId)
    }
    
    render() {
        console.log("this is the recipe" + this.props.match.params.recipeId)
        console.log(typeof(this.props.recipe.data))
        
        if (!this.props.recipe.data) {
            return(<div></div>);
        }

        return (
            <div>
                <div className="col s8 recipe">
                    <h5 className="valign-wrapper">{this.props.recipe.data.name}  <i class="small material-icons">add_circle</i></h5>
                    <div><b>Category:</b> {this.props.recipe.data.attributes.course['0']}  <b>Time to Prepare:</b> {this.props.recipe.data.totalTime}</div>
                    <div><b>Servings:</b> {this.props.recipe.data.numberOfServings} <b>Calories:</b>   </div>
                    {this.props.recipe.data.ingredientLines.map((item, i) => <ul> {item} </ul>)}
                </div>
               
                <div className="col s4 center-align recipe">
                    <img className="detImg" src={this.props.recipe.data.images['0'].hostedLargeUrl} alt="food item" />
                    <div className="row">
                        <div className="col s12 center-align">
                        <a href={this.props.recipe.data.source.sourceRecipeUrl} class="waves-effect waves-light btn">Click here for full recipe</a>
                        </div>
                        </div>
                </div>
            </div>

        )
    }
}

export default Recipes
    