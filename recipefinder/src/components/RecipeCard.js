import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class RecipeCard extends Component {
    
    render() {
        return (
         
            
            <div class="col s2">
             
              <div class="card">
                <div class="card-image">
                  <img src={this.props.imgSrc} />
                  
                  <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
                </div>
                
                <Link to={`/${this.props.id}`}><div class="card-content">{this.props.title}
                    <p>{this.props.recSrc}</p></div></Link>
                
              </div>
              
            </div>
          
        )
    }
}

export default RecipeCard