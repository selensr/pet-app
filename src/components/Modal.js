import React from "react";

const Modal = props => {
  return (
    <div
      className="Modal"
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0"
      }}
    >
      <button
        className="btn btn-primary"
        style={{ margin: "5px" }}
        onClick={props.closeModal}
      >
        Close
      </button>
      <h3>{props.name}</h3>
      <img
        className="card-img-top"
        src={props.image}
        alt=""
        style={{ height: "150px", objectFit: "contain" }}
      />
      <div>{props.age}</div>
      <div>{props.description}</div>
      <div>{props.breed}</div>
      {props.favori || props.isFavourited ? (
        <button
          className="btn btn-danger"
          style={{ marginTop: "10px" }}
          disabled
        >
          Favorilerden kaldır
        </button>
      ) : (
        <button
          className="btn btn-primary"
          style={{ marginTop: "10px" }}
          onClick={() => {
            props.handlePost(props.pet);
          }}
        >
          Favorilere Ekle
        </button>
      )}
    </div>
  );
};

export default Modal;

// {
//   props.favori || props.isChecked ? (
//     <button
//       className="btn btn-primary"
//       style={{marginTop: "10px"}}
//       onClick={() =>
//       {
//         props.handlePost(props.pet);
//       }}
//     >
//       Favorilere Ekle
//         </button>
//   ) : (
//     <button
//       className="btn btn-danger"
//       style={{marginTop: "10px"}}
//       disabled
//     >
//       Favorilere Ekle
//         </button>
//   )
// }
