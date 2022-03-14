import React, { useState } from "react";
import UserCard from "./UserCard";
import { RemoveButton, AddMoreButton } from "./Buttons";
import { Spinner, Form } from "react-bootstrap";
import axios from "axios";

export default function EditableUserList(props) {
  const { editedProject, editMode, updateEditedProject, title, field } = props;

  const [showDropdown, setShowDropdown] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const storedToken = localStorage.getItem("authToken");

  const toggleShowDropdown = () => setShowDropdown((previous) => !previous);

  function fetchUsers() {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/users`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setAllUsers(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }
  return (
    <div className="w-100 mt-4">
      <h6>{title}</h6>
      <div className="w-100 mt-3">
        {!editedProject ||
        !editedProject[field] ||
        editedProject[field].length === 0 ? (
          <p className="mb-0 text-muted"> None assigned yet.</p>
        ) : (
          editedProject[field].map((user) => (
            <div className="d-flex align-items-center" key={user._id}>
              <UserCard user={user} className="w-50" />
              {editMode && (
                <RemoveButton
                  onClick={() =>
                    updateEditedProject(
                      field,
                      editedProject[field].filter((u) => u._id !== user._id)
                    )
                  }
                />
              )}
            </div>
          ))
        )}
      </div>
      {isLoading && <Spinner animation="border" variant="secondary-cstm" />}
      {editMode && showDropdown && (
        <Form.Select
          className="w-50"
          onChange={(e) =>
            updateEditedProject(field, [
              ...editedProject[field],
              allUsers.find((user) => user._id === e.target.value),
            ])
          }
        >
          <option></option>
          {allUsers.map((user, index) => (
            <option key={index} value={user._id}>
              {user.firstName} ({user.email})
            </option>
          ))}
        </Form.Select>
      )}
      {editMode && (
        <AddMoreButton
          onClick={() => {
            fetchUsers();
            toggleShowDropdown();
          }}
        />
      )}
    </div>
  );
}
