import React from "react";
import axios from "axios";

class PetDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pet: []
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`http://5dd7af92505c590014d3b4ac.mockapi.io/pets/${id}`)
      .then(({ data: pet }) => {
        console.log("pet", pet);
        this.setState({ pet });
      });
  }
  render() {
    return (
      <div className="container pet">
        <div className="cart">
          <img
            className="card-img-top"
            src={this.state.pet.image}
            alt=""
            style={{ height: "300px", objectFit: "contain" }}
          />

          <div className="card-body">
            <h4 className="card-title">
              {this.state.pet.name}
              <div>
                <span
                  className="badge badge-primary"
                  style={{ fontSize: "12px" }}
                >
                  {this.state.pet.breed}
                </span>
              </div>
              <div>
                <span
                  className="badge badge-warning"
                  style={{ fontSize: "12px" }}
                >
                  {this.state.pet.age}
                </span>
              </div>
              <div>{this.state.pet.description}</div>
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

export default PetDetail;
