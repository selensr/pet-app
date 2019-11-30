import React from "react";
import { Pet, Modal } from "../components";
import { getPets } from "../constants";
import { stringContains } from "../helpers";
import axios from "axios";

class PetList extends React.Component {
  breed;
  constructor(props) {
    super(props);
    this.state = {
      _pets: [],
      pets: [],
      yukleniyor: true,
      index: 4,
      liked: false,
      likedPet: [],
      favori: false,
      favourites: []
    };
  }

  componentDidMount() {
    getPets().then(data => {
      this.setState({
        _pets: data,
        pets: data,
        yukleniyor: false
      });
    });
    this.getFavouritePets();
    window.addEventListener("scroll", this.handleScroll);
  }

  getFavouritePets = () => {
    axios
      .get("http://5dd7af92505c590014d3b4ac.mockapi.io/favorites")
      .then(res =>
        this.setState({
          favourites: res.data
        })
      );
  };

  // event windowa bağlı olduğu için tüm sayfalarda scroll eventi çalışacak
  componentDidUpdate(prevProps) {
    if (prevProps.activeFilter !== this.props.activeFilter) {
      this.filterPets();
    }
    if (prevProps.searchValue !== this.props.searchValue) {
      this.filterPets();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  // sayfayla birlikte kaldırılacak

  filterPets = () => {
    if (!this.props.activeFilter) {
      this.setState({
        pets: this.state._pets.filter(pet => {
          return stringContains(pet.name, this.props.searchValue);
        })
      });
    } else {
      const searchVal = this.props.searchValue;
      this.setState({
        pets: this.state._pets
          .filter(pet => {
            return pet.breed === this.props.activeFilter;
          })
          .filter(filteredPet => {
            return filteredPet.name
              .toLowerCase()
              .startsWith(searchVal.toLowerCase(), 0);
          })
      });
    }
  };

  handleScroll = () => {
    window.onscroll = () => {
      this.setState({
        index: this.state.index + 4
      });
    };
  };

  isLiked = id => {
    this.setState({
      liked: true,
      likedPet: this.state.pets.filter(pet => pet.id === id)
    });
  };

  closeModal = () => {
    this.setState({
      liked: false
    });
  };

  handlePost = pet => {
    axios
      .post("http://5dd7af92505c590014d3b4ac.mockapi.io/favorites", {
        pet: pet,
        owner: "Selen"
      })
      .then(res => {
        if (res) {
          this.setState({
            favori: !this.state.favori
          });
        }
      });
  };

  // arrayToObject = array => {
  //   array.reduce((obj, item) => {
  //     obj[item.id] = item;
  //     return obj;
  //   }, {});
  // };

  checkFavorite = id => {
    {
      return this.state.favourites.some(pet => {
        if (pet && pet.pet && pet.pet.id) {
          return pet.pet.id === id;
        }
      });
    }
  };

  render() {
    const Yukleniyor = <div>Yukleniyor</div>;

    const EmptyPets = <div>Bulunamadı</div>;

    let petResults = this.state.pets.slice(0, this.state.index);

    const Pets = [
      <div>
        {this.state.likedPet.map(pet => {
          return (
            <Modal
              closeModal={this.closeModal}
              show={this.state.liked}
              key={Math.random()}
              {...pet}
              pet={pet}
              handlePost={this.handlePost}
              favori={this.state.favori}
              isFavourited={this.checkFavorite(pet.id)}
            />
          );
        })}
      </div>,
      <h3>Gösterilen Pet Sayısı: {this.state.pets.length}</h3>,
      <div className="row">
        {petResults.map(pet => {
          return <Pet key={Math.random()} {...pet} isLiked={this.isLiked} />;
        })}
      </div>
    ];

    if (this.state.yukleniyor) {
      return Yukleniyor;
    } else if (this.state.pets.length === 0) {
      return EmptyPets;
    } else {
      return Pets;
    }
  }
}

export default PetList;
