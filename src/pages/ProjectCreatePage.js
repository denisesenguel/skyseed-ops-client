import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import DropDown from '../components/DropDown';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProjectCreatePage() {

  // put this somewhere else?
  const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
  const status = ['planned', 'ongoing', 'finished'];

  const navigate = useNavigate();
  const [formInputs, setFormInputs] = useState({});
  const [allUsers, setAllUsers] = useState(["None in the DB yet", "Add some"]);
  const [allCustomers, setAllCustomers] = useState(["None in the DB yet"]);
  const [submitState, setSubmitState] = useState(undefined);
  
  useEffect(() => {
    // get list of all users first names for managers dropdown in form 
    // atm for simplicity: _id
    axios
    .get(`${process.env.REACT_APP_API_URL}/users`)
    .then((response) => setAllUsers(response.data.map(user => user._id)))
    .catch((error) => console.log("Error getting users from API: ", error));
    // get list of all customer first+last names for customer selection
    // [customer., customer.lastName].join(" ")
    // atm for simplicity: _id
    axios
    .get(`${process.env.REACT_APP_API_URL}/customers`)
    .then((response) => {;
      setAllCustomers(response.data.map(customer => (customer._id)));
    })
    .catch((error) => console.log("Error getting customers from API: ", error));
  }, []);
  
  function handleInputs(evnt) {
    const newInputs = {...formInputs};
    newInputs[evnt.target.id] = evnt.target.value;
    setFormInputs(newInputs);
  }

  function handleSubmit(evnt) {
    evnt.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/projects`, formInputs)
      .then((response) => {
        setSubmitState('success');
        const newInputs = {...formInputs};
        for (const key in newInputs) {
          newInputs[key] = "";
        }
        setFormInputs(newInputs);
        //navigate("/project/${response.data._id}?created=true")
        ;
      })
      .catch((error) => {
        console.log("Error creating project: ", error);
        setSubmitState('error');
      })
  }

  return (
    <div className="mx-5">
      <h2 className="my-4">Add a new Project</h2>
        <Form onSubmit={ handleSubmit }>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control 
              type="text" placeholder="Forst XYZ" 
              value={ formInputs.title } onChange={ handleInputs }  
            />
          </Form.Group>
          <div className="d-flex">
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control 
                type="text" placeholder=""
                value={ formInputs.location } onChange={ handleInputs }
              />
            </Form.Group>
            <DropDown 
              optionsArray={ seasons } 
              label="Season" fieldName="season"
              formInputs={ formInputs }
              onChange={ handleInputs }
            />
            <Form.Group controlId="year">
              <Form.Label>Year</Form.Label>
              <Form.Control 
                type="number" fieldName="year"
                value={ formInputs.year } onChange={ handleInputs }
              />
            </Form.Group>
          </div>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as="textarea" rows={3} placeholder="Give a short description"
              value={ formInputs.description } onChange={ handleInputs }
            />
          </Form.Group>
          <div className="d-flex">
            <Form.Group controlId="sizeInHa">
              <Form.Label>Size (in ha)</Form.Label>
              <Form.Control 
                type="number" placeholder="5.6"
                value={ formInputs.sizeInHa } onChange={ handleInputs }
              />
            </Form.Group>
            <DropDown 
              optionsArray={ status } 
              label="Status" 
              fieldName="status" 
              formInputs={ formInputs }
              onChange={ handleInputs }
            />
          </div>
          <DropDown 
            optionsArray={ allCustomers } 
            label="Client" 
            fieldName="customer" 
            formInputs={ formInputs }
            onChange={ handleInputs }
          />
          <DropDown 
            optionsArray={ allUsers } 
            label="Pick at least one Project Manager" 
            fieldName="managers" 
            formInputs={ formInputs }
            onChange={ handleInputs }
            isMultiple={ true }
          />
          <Button className="bg-secondary-cstm text-primary-cstm mt-4" variant="secondary-cstm" type="submit">Add Project</Button>
        </Form>
        { submitState === 'success' && <h4 className="mt-4 bg-success-cstm text-white"> Project successfully created. </h4> }
        { submitState === 'error' && <h4 className="mt-4 bg-error-cstm"> Error creating project. Please try again. </h4> }
    </div>
  )
}
