import React, { Component } from 'react';

class Search extends Component {
    handleSubmit = (e) => {
        console.log("in handleChange")
        console.log(e.target.search.value)
            e.preventDefault();
            this.props.search(e.target.search.value)
            e.target.search.value = ''; 
        } 

    render() {
        return (
                <div className="row">
                    <form className="col s12" onSubmit={this.handleSubmit}>
                        <div className="row search">
                            <div className="input-field col s12">
                                <input type="text" name="search" placeholder="Search" />
                            </div>
                        </div>
                    </form>
        		</div>
          
        )
    }
}

export default Search