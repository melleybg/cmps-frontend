import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import axios from "axios";
import moment from 'moment';
import MovieSearch from '../MovieSearch/MovieSearch.js'
import ResultsWindow from '../ResultsWindow/ResultsWindow.js';
import Layout from '../Layout/Layout.js';
import UserSidebar from '../UserSidebar/UserSidebar.js';
import UserPage from '../UserPage/UserPage.js';
import '../App/App.css';

//main landing page for search
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {
        username: localStorage.getItem('user'),
        photo_url: localStorage.getItem('photo')
      },
      movieId: null,
      apiMovies: [],
      searchPhrase: null,
    }
    this.logOutUser = this.logOutUser.bind(this)
  }

  componentDidMount() {
    new Date()
       console.log(new Date())
       let currentDate = moment(new Date()).format('YYYY-MM-DD')
       console.log(`Current date is ${currentDate}`)

    // axios.get(`http://data.tmsapi.com/v1.1/movies/showings?startDate=${currentDate}&zip=20005&radius=3&api_key=z2ud6x8tjayerzhpab34c8ne`)
    //    .then((res) => {
    //      this.setState({apiMovies: res.data})
    //    })
}

  logOutUser(e) {
    e.preventDefault();
    this.setState({user: ""})
    localStorage.setItem("user", "")
    localStorage.setItem("photo", "")
    console.log("User logged out.")
  }

  signInUser(e) {
    e.preventDefault()
    axios.get(`https://cmps-backend.herokuapp.com/api/users/${this.state.searchPhrase}`)
      .then((res) => {
        this.setState({user: res.data})
        localStorage.setItem("user", res.data.username)
        localStorage.setItem("photo", res.data.photo_url)
        console.log(`User ${this.state.user.username} signed in.`)
      })
    }

  handleSearchInput(e) {
    this.setState({
      searchPhrase: e.target.value
    })
  }

  render() {
    console.log(`User State in App.js = ${this.state.user.username}`)
       return (

      <Router>

        <div className="App">

          <Layout />

            <Switch>

              <Route path="/users" render={(props) => {
                return(
                <div>
                  <UserPage user={this.state.user}/>
                </div>
              )
            }}
          />

              <Route path="/" render={(props) => {
                    return (
                      <div>
                        <MovieSearch changeMovieId={this.changeMovieId} apiMovies={this.state.apiMovies}/>
                        <ResultsWindow theaterResult={this.state.theaterResult} movieId={this.state.movieId} apiMovies={this.state.apiMovies}/>
                        <UserSidebar {...props} user={this.state.user} logOutUser={this.logOutUser}/>
                            <br/>
                        <h3>Sign In</h3>
                          <form onSubmit={(e) => this.signInUser(e)}>
                            <textarea onChange={(e) => this.handleSearchInput(e)}></textarea>
                            <input type="submit" value="Sign In"/>
                          </form>
                            <br/>
                        <h3>{this.state.user && this.state.user.username}</h3>
                            <br/>
                        <form onSubmit={(e) => this.logOutUser(e)}>
                          <input type="submit" value="Sign Out"/>
                        </form>
                      </div>
                    )
                }}
              />
            </Switch>
          </div>
        </Router>
    );
  }
}
export default App;
