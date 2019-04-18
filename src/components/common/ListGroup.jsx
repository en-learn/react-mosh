import React from "react";
import PropTypes from "prop-types";

const ListGroup = ({
  items,
  selectedItem,
  textProperty,
  valueProperty,
  onItemSelect
}) => {
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          style={{ cursor: "pointer" }}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  textProperty: PropTypes.string,
  valueProperty: PropTypes.string
};

export default ListGroup;
