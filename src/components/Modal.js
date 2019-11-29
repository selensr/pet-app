import React from "react";

const Modal = props => {
  const { name, image, age, description, breed } = props;

  return (
    <div
      className="Modal"
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0"
      }}
    >
      <button onClick={props.closeModal}>Close</button>
      <h3>{name}</h3>
      <img
        className="card-img-top"
        src={image}
        alt=""
        style={{ height: "150px", objectFit: "contain" }}
      />
      <div>{age}</div>
      <div>{description}</div>
      <div>{breed}</div>
    </div>
  );
};

export default Modal;
