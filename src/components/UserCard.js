import React from "react";
import userImg from "../images/forest_bg_website.jpg";
import { ButtonMailTo } from "./Buttons"; 
import Card from "react-bootstrap/Card";

export default function UserCard(props) {
    const {user} = props;
  return (
    <div>
      <Card
        key={user._id}
        className="d-flex flex-row align-items-center my-1 shadow"
      >
        <img
          src={userImg}
          className="rounded-circle fix-img-height m-2"
          alt={user.firstName}
        />
        <div className="mx-2">
          <p className="mb-0">{user.firstName}</p>
          <ButtonMailTo
            label={user.email}
            mailto={`mailto:${user.email}`}
            className="text-decoration-underline text-secondary-cstm"
          />
        </div>
      </Card>
    </div>
  );
}
