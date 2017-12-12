import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class RecipeCard extends Component {
    
    render() {
        return (
            <div className="col m2 s6">
                <div className="card">
                    <div className="card-image">
                        <img src={this.props.imgSrc} alt="recipe" />
                    </div>
                    <Link to={`/${this.props.id}`}>
                        <div className="card-content">
                            <div className="center-align"><b>{this.props.title}</b></div>
                            <div className="center-align"><p>{this.props.recSrc}</p></div>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}

export default RecipeCard;