import React, { Component } from "react";

// import "../../App.css";

import API from "../../API"
import Wrapper from "../../components/Wrapper";
import RestCard from "../../components/RestCard";
import VenCard from "../../components/VenCard";
import ResultButton from "../../components/ResultButton";
import VenResultButton from "../../components/VenResultButton";
import { Link } from 'react-router-dom';
import { withUser } from '../../services/withUser';
import axios from "axios";

class SearchPage extends Component {

  componentDidMount() {
    // only try loading stuff if the user is logged in.
    if (!this.props.user) {
      return;
    }
    console.log(this.props.user);
      axios.get('/api/Restaurants/' + this.props.user.id)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
      axios.get('/api/RecipeEXP/' + "onion")
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err)
        })
  }

state = {
  venues: [],
  singleVen: undefined,
  loSearch: "arlington va",
  restSearch: "bar",
  showRestInfo: true
}

  // componentDidMount() {
  //   this.loadRest();
  // }

  handleInputChange = event => {
   const { name, value } = event.target;
   this.setState({
     [name]: value
   });
 };

 handleTru = event => {
   this.state.showRestInfo === false ?
     this.setState({ showRestInfo: true })
     :
     this.setState({ showRestInfo: false });
 }

  loadRest = event => {

    event.preventDefault();

    API.getRest(this.state.loSearch, this.state.restSearch)
    .then(res => {
      console.log(res.data.response.venues)
      this.setState({ venues: res.data.response.venues })
    })
    .catch(err => console.log(err));

// this.setState({ venues: res.data.response.venues })
  }

  loadVen = event => {

    event.persist();
    event.preventDefault();
    let id = event.currentTarget.id;

    this.handleTru();

    API.getVenue(id)
    .then(res => {
      console.log(res.data.response.venue)
      this.setState({ singleVen: res.data.response.venue })
    })
    .catch(err => console.log(err));
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
    console.log(renderRestCard)
    return renderRestCard;
  }

  renderVenCard = () => {

    if (this.state.singleVen !== undefined) {
      let singleVenObj = this.state.singleVen;

        let renderVenObj = {
              key: singleVenObj.id,
              id: singleVenObj.id,
              name: singleVenObj.name,
              hours: singleVenObj.hours,
              location: singleVenObj.location,
              phone: singleVenObj.contact,
              url: singleVenObj.url
        }

          console.log(renderVenObj)

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



  // =====================

  render () {

    return (
  <Wrapper>

    <p> hello world </p>
    <p> <Link to="/"> Click Here </Link> to go back to the home page! </p>
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

        { this.state.showRestInfo === true ? this.renderRestCard() : this.renderRestCard() && this.renderVenCard() }

    </Wrapper>
    )
  }
}

export default SearchPage;

//make a button component called "buttonResult or something. render the rest card inside of it. "