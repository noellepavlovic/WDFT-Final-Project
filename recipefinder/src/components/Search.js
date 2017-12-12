import React, { Component } from 'react';

class Search extends Component {
    handleSubmit = (e) => {
            e.preventDefault();
            this.props.search(e.target.search.value)
            e.target.search.value = ''; 
        } 

    render() {
        return (
            <form className="col s12" onSubmit={this.handleSubmit}>
                <div className="input-field ">
                    <input type="text" name="search" placeholder="Search" />
                </div>
            </form>            
        )
    }
}

export default Search;