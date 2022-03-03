import React from "react";
import { Link } from "react-router-dom";

function ButtonMailTo({ mailto, label }) {
    return (
        <Link
            className="text-decoration-none text-primary-cstm"
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

export default ButtonMailTo;