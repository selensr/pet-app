import React from "react";

function FavouritedPet(props) {
  const { image, name, breed, age } = props.pet;
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 ">
          <div className="card h-100">
            <img
              className="card-img-top"
              src={image}
              alt=""
              style={{ height: "150px", objectFit: "contain" }}
            />

            <div className="card-body">
              <h4 className="card-title">
                {name}
                <div>
                  <span
                    className="badge badge-primary"
                    style={{ fontSize: "12px" }}
                  >
                    {breed}
                  </span>
                </div>
                <div>
                  <span
                    className="badge badge-warning"
                    style={{ fontSize: "12px" }}
                  >
                    {age}
                  </span>
                </div>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavouritedPet;
