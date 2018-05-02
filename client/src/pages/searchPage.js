import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
// import restContainer from "./components/restContainer";
import API from "./API"
import Wrapper from "./components/Wrapper";
import RestCard from "./components/RestCard";
import VenCard from "./components/VenCard";
import ResultButton from "./components/ResultButton";
import VenResultButton from "./components/VenResultButton";
import RecipeCard from "./components/RecipeCard";
import RecResultButton from "./components/RecResultButton";
// import InputFields from "./components/InputFields";

class App extends Component {

state = {
  venues: [],
  recipes: [],
  singleVen: undefined,
  loSearch: "arlington va",
  restSearch: "burger",
  showRestInfo: true
}

 handleInputChange = event => {
   const { name, value } = event.target;
   this.setState({
     [name]: value
   });
 };

 handleTru = event => {
   if (this.state.showRestInfo === true) {
     this.setState({ showRestInfo: false })
   }

  else if (this.state.showRestInfo === false && this.state.singleVen !== undefined) {
    this.setState({ showRestInfo: false })
  }
 }

// ===================

  loadRest = event => {

    event.preventDefault();

      API.getRest(this.state.loSearch, this.state.restSearch)
      .then(res => {
        this.setState({ venues: res.data.response.venues })
      })
      .catch(err => console.log(err));

        this.setState({ singleVen: undefined })
        this.loadRecipe();
  }

  loadVen = event => {
    let id = event.currentTarget.id;

      event.persist();
        event.preventDefault();
          this.handleTru();

    API.getVenue(id)
    .then(res => {
      console.log(res.data.response.venue)
      this.setState({ singleVen: res.data.response.venue })
    })
    .catch(err => console.log(err));
  }

  loadRecipe = event => {

    API.getRec(this.state.restSearch)
    .then(res => {
      console.log(res)
      this.setState({ recipes: res.data })
    })
    .catch(err => console.log(err));
    console.log(this.state.recipes)
  }
// =======================
  renderRestCard = () => {

    let renderRestCard = this.state.venues.map(restaurant => (
      <ResultButton
      key={restaurant.id}
      id={restaurant.id}
      clicked={this.showRestInfo}
      clickVenueBtn={this.loadVen}
      clickHandleTru={this.handleTru}
      >
      {RestCard(restaurant)}
      </ResultButton>
    ))
    return renderRestCard;
  }

  renderVenCard = () => {

    if (this.state.singleVen !== undefined) {
      let imgPre = "https://igx.4sqi.net/img/general/width960"
      let imgSuf = this.state.singleVen.photos.groups[0].items[0].suffix;
      console.log(imgPre + imgSuf)
      let singleVenObj = this.state.singleVen;
        let renderVenObj = {
              key: singleVenObj.id,
              id: singleVenObj.id,
              name: singleVenObj.name,
              hours: singleVenObj.hours,
              location: singleVenObj.location,
              phone: singleVenObj.contact,
              url: singleVenObj.url,
              img: imgPre + imgSuf
        }
            return (
                <VenResultButton
                key={renderVenObj.id}
                id={renderVenObj.id}
                clicked={this.showRestInfo}
                clickHandleTru={this.handleTru}
                >
                {VenCard(renderVenObj)}
                </VenResultButton>
              )
    }
  }

  renderRecCard = () => {

    let renderRestCard = this.state.recipes.map(recipe => (
      <RecResultButton
        key={recipe.title}
        id={recipe.title}
        href={recipe.href}
        >
        {RecipeCard(recipe)}
        </RecResultButton>
      ))
    return renderRestCard;
  }

  // =====================

  render () {

  if (this.state.showRestInfo === true) {
    return (
  <Wrapper>

    <p> hello world </p>
    <input
      name="loSearch"
      value={this.state.loSearch}
      onChange={this.handleInputChange}
      placeholder="Location Search"
      />
    <input
      name="restSearch"
      value={this.state.restSearch}
      onChange={this.handleInputChange}
      placeholder="Restaurant Search"
      />
    <button
      onClick={this.loadRest}
      type="success"
      >
      Search
    </button>

        { this.renderRestCard() }
        { this.renderRecCard() }

    </Wrapper>
    )
  }
  else {

    return (
      <Wrapper>

        <p> hello world </p>
        <input
          name="loSearch"
          value={this.state.loSearch}
          onChange={this.handleInputChange}
          placeholder="Location Search"
          />
        <input
          name="restSearch"
          value={this.state.restSearch}
          onChange={this.handleInputChange}
          placeholder="Restaurant Search"
          />
        <button
          onClick={this.loadRest}
          type="success"
          >
          Search
        </button>

            { this.renderRestCard() }
            { this.renderRecCard() }
            { this.renderVenCard() }

      </Wrapper>
    )
  }
  }
}

export default App;