import React from "react";
import { Link } from "react-router-dom";

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

export default ButtonMailTo;