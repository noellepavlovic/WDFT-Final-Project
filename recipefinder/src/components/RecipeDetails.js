import React, { Component } from 'react';


class Recipes extends Component {
    
    componentWillMount(){
        this.props.getRecipe(this.props.match.params.recipeId)
    }
    
    render() {
        console.log("this is the recipe" + this.props.match.params.recipeId)
               
        if (!this.props.recipe.data) {
            return(<div></div>);
        }

        return (
            <div>
                <div className="col s8 recipe">
                    <h5 className="valign-wrapper">{this.props.recipe.data.name}
                        {this.props.user
                            ? <i class="small material-icons"><button onClick={() => this.props.saveRecipe()} >add_circle</button></i>
                            : null}
                    </h5>
                    <div>
                        {(this.props.recipe.data.attributes > 0)
                            ? <span><b>Category: </b> {this.props.recipe.data.attributes.course['0']} </span>
                            : null}
                        {this.props.recipe.data.totalTime
                            ? <span><b>Time to Prepare:</b> {this.props.recipe.data.totalTime}</span>
                            : null}
                    </div>
                    <div>
                        {this.props.recipe.data.numberOfServings 
                            ? <span><b>Servings:</b> {this.props.recipe.data.numberOfServings}</span> 
                            : null}
                        {(this.props.recipe.data.nutritionEstimates.length > 0)
                            ? <span> <b>Calories:</b>  {this.props.recipe.data.nutritionEstimates["0"].value}</span> 
                            : null}
                    </div>
                    {(this.props.recipe.data.ingredientLines.length > 0)
                        ? this.props.recipe.data.ingredientLines.map((item, i) => <ul> {item} </ul>) 
                        : null}
                </div>

                <div className="col s4 center-align recipe">
                    {(this.props.recipe.data.images) 
                    ? <div><img className="detImg" src={this.props.recipe.data.images['0'].hostedLargeUrl} alt="food item" /></div>
                    : null }
                    <div className="row">
                        {this.props.recipe.data.source.sourceRecipeUrl 
                            ? <div className="col s12 center-align">
                            <a href={this.props.recipe.data.source.sourceRecipeUrl} class="waves-effect waves-light btn">Click here for full recipe</a>
                            </div>
                            : null}
                    </div>
                </div>
            </div>

        )
    }
}

export default Recipes;
    