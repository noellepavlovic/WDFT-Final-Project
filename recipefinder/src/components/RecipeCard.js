import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class RecipeCard extends Component {
    
    render() {
        return (
         
            
            <div class="col s2">
             
              <div class="card">
                <div class="card-image">
                  <img src={this.props.imgSrc} />
                 </div>
                
                <Link to={`/${this.props.id}`}>
                    <div class="card-content">
                        <div className="center-align"><b>{this.props.title}</b></div>
                        <div className="center-align"><p>{this.props.recSrc}</p></div>
                    </div>
                </Link>
                
              </div>
              
            </div>
          
        )
    }
}

export default RecipeCard