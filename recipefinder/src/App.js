import React, { Component } from 'react';
import { withRouter, Route, Switch } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import './App.css';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Recipes from './components/Recipes';
import RecipeDetails from './components/RecipeDetails';

axios.defaults.withCredentials = true;

class App extends Component {

    constructor() {
        super()
        this.state = {
            user: false,
            recipes: [],
            recipe: [],
            recipebox: []
        }
    }

    componentDidMount() {
        this.verifyAuthenticated();

        switch (window.location.pathname) {
            case '/recipebox':
                this.loadRecipebox();
                break;
            case '/':
            case '':
                axios.get('http://localhost:8080/')
                .then((response) => {
                    let __recipes = response.data.matches;
                    this.setState({
                        recipes: __recipes
                    })
                });
                break;

            default:
                let recipeId = window.location.href;
                this.getRecipe(recipeId.substring(1));
        }
        
    }

    verifyAuthenticated = () => {
        let now = Date.now().toString();
        axios.get('http://localhost:8080/account?' + now)
            .then((response) => {
                if (response.status !== 401) {
                    this.setState({
                        user: response.data
                    })
                }
            })
    }

    loadRecipebox = () => {
        axios.get('http://localhost:8080/recipebox')
            .then((response) => {
                let __recipebox = response.data
                this.setState({
                    recipebox: __recipebox
                })
                this.props.history.push('/recipebox');
            })
    }

    search = (search) => {
        axios.post('http://localhost:8080/search', { search: search })
            .then((response) => {
                if (response.data.message) {
                    swal(response.data.message);
                } else {
                    let __recipes = response.data.matches;
                    this.setState({
                        recipes: __recipes
                    })
                }
            })
        this.props.history.push('/search');
    }

    getRecipe = (recipeId) => {
        axios.get(`http://localhost:8080/getRecipe/${recipeId}`)
            .then((response) => {
                let __recipe = response;
                this.setState({
                    recipe: __recipe
                })
            })
    }

    saveRecipe = () => {
        let recipe = this.state.recipe;

        axios.post('http://localhost:8080/recipe', { recipe: recipe })
            .then((response) => {
                swal(response.data.message);
            })
    }

    removeRecipe = (recipeid) => {
        axios.delete(`http://localhost:8080/delete/${recipeid}`)
            .then((response) => {
                swal(response.data.message);
            })
    }

    getRecipebox = () => {
        axios.get('http://localhost:8080/recipebox')
            .then((response) => {
                let __recipebox = response.data;
                this.setState({
                    recipebox: __recipebox
                })
                this.props.history.push('/recipebox');
                if (response.data.error) {
                    swal(response.data.error);
                }
            })
    }

    logout = () => {
        axios.get('http://localhost:8080/logout')
            .then((response) => {
                this.setState({
                    user: false
                })
                document.location.href = 'https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000';
            })
    }
    
    render() {
        return (
            <div className="container">
                <Header />
                <Navbar history = {this.props.history} user={this.state.user} logout={() => this.logout()} getRecipebox={() => this.getRecipebox()} />
                <Search search={(search) => this.search(search)} />
                <div className="row fullLength">
                    <div className="col s12 main z-depth-2">
                        <Switch>
                            <Route exact path="/" render={() => <Recipes recipes={this.state.recipes} />} />
                            <Route exact path="/recipebox" render={() => <Recipes recipes={this.state.recipebox} />} />
                            <Route path="/:recipeId" render={(props) => <RecipeDetails user={this.state.user} recipe={this.state.recipe} recipebox={this.state.recipebox}
                                removeRecipe={(recipeid) => this.removeRecipe(recipeid)} saveRecipe={() => this.saveRecipe()} getRecipe={(recipeId) => this.getRecipe(recipeId)} {...props} />} />
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(App);
