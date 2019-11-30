import React, { Component } from "react";
import axios from "axios";
import FavouritedPet from "./FavouritedPet";

export default class FavoritesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favouritedPets: []
    };
  }

  componentDidMount() {
    axios
      .get("http://5dd7af92505c590014d3b4ac.mockapi.io/favorites")
      .then(res =>
        this.setState(
          {
            favouritedPets: res.data
          },
          () => {
            console.log(this.state.favouritedPets);
          }
        )
      );
  }

  render() {
    return (
      <div>
        {this.state.favouritedPets
          .filter(pet => pet.pet && pet.owner === "Selen")
          .map(pet => (
            <FavouritedPet key={Math.random()} {...pet} />
          ))}
      </div>
    );
  }
}
