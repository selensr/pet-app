import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  changeValue = e => {
    const val = e.target.value;
    this.setState(
      {
        value: val
      },
      () => {
        this.props.onSearch(val);
      }
    );
  };

  render() {
    return (
      <div className="search">
        <h4>Arama</h4>
        <input
          type="text"
          value={this.state.value}
          onChange={this.changeValue}
        />
      </div>
    );
  }
}

export default Search;
