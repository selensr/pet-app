import React from "react";
import { Link } from "react-router-dom";

function Pet(props) {
  return (
    <div className="col-lg-6 col-md-4 mb-2">
      <div className="card h-100">
        <Link to={`/${props.id}`}>
          <img
            className="card-img-top"
            src={props.image}
            alt=""
            style={{ height: "150px", objectFit: "contain" }}
          />
        </Link>
        <div className="card-body">
          <h4 className="card-title">
            <Link to={`/${props.id}`}>{props.name}</Link>
            <div>
              <span
                className="badge badge-primary"
                style={{ fontSize: "12px" }}
              >
                {props.breed}
              </span>
            </div>
            <div>
              <span
                className="badge badge-warning"
                style={{ fontSize: "12px" }}
              >
                {props.age}
              </span>
            </div>
          </h4>
        </div>
        <div className="card-footer">
          <button
            className="btn btn-success"
            onClick={() => {
              props.isLiked(props.id);
            }}
          >
            Favorilere Ekle
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pet;
