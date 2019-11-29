import React from "react";
import { Pet, Modal } from "../components";
import { getPets } from "../constants";
import { stringContains } from "../helpers";

class PetList extends React.Component {
  breed;
  constructor(props) {
    super(props);
    this.state = {
      _pets: [],
      pets: [],
      yukleniyor: true,
      index: 0,
      liked: false,
      likedPet: []
    };
  }

  componentDidMount() {
    getPets().then(data => {
      this.setState({
        _pets: data,
        pets: data,
        yukleniyor: false
      });

      window.addEventListener("scroll", this.handleScroll);
    });
  }

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
            return searchVal.startsWith(filteredPet.name, 0);
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
    this.setState(
      {
        liked: true,
        likedPet: this.state.pets.filter(pet => pet.id === id)
      },
      () => {
        console.log(this.state.likedPet);
      }
    );
  };

  closeModal = () => {
    this.setState({
      liked: false
    });
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
