import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import * as FiIcons from "react-icons/fi";


function ButtonMailTo(props) {

    let { mailto, label, className } = props;
    if (!className) className = "text-decoration-none text-primary-cstm";

    return (
        <Link
            className={ className }
            to='#'
            onClick={(e) => {
                window.location = mailto;
                e.preventDefault();
            }}
        >
            {label}
        </Link>
    );
};


function AddMoreButton({ onClick }) {
  return (
    <div>
      <Button
        variant="custom"
        className="text-primary-cstm d-flex align-items-center px-0"
        onClick={ onClick }
      >
        <FiIcons.FiPlus className="text-primary-cstm mx-1" />
        Add more
      </Button>
    </div>
  );
}

function RemoveButton({ onClick }) {
  return (
    <div>
      <Button
        variant="custom"
        className="text-primary-cstm d-flex align-items-center px-0"
        onClick={ onClick }
      >
        <FiIcons.FiMinus className="text-primary-cstm mx-1" />
        Remove
      </Button>
    </div>
  )
}

export { ButtonMailTo, AddMoreButton, RemoveButton };