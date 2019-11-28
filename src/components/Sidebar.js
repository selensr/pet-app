import React from "react";
import { Filters } from "../components";
import { Search } from "../components";

function Sidebar(props) {
  return (
    <div>
      <Search onSearch={props.onSearch} />
      <Filters
        onFilterPets={props.onFilterPets}
        activeFilter={props.activeFilter}
      />
    </div>
  );
}

export default Sidebar;
