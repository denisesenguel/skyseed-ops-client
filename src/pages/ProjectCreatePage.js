import React, { useContext, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { enumArrays } from '../config/dataConfigs';
import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';

export default function ProjectCreatePage() {

  const navigate = useNavigate();
  const [formInputs, setFormInputs] = useState({});
  const [allUsers, setAllUsers] = useState(["None in the DB yet", "Add some"]);
  const [allCustomers, setAllCustomers] = useState(["None in the DB yet"]);
  const [submitState, setSubmitState] = useState(undefined);
  
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem('authToken');

  useEffect(() => {
    
    // get list of all users first names + email for managers dropdown in form 
    axios
    .get(
      `${process.env.REACT_APP_API_URL}/users`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => setAllUsers(response.data))
    .catch((error) => console.log("Error getting users from API: ", error));
    
    // get list of all customer names incl emails (for unique matching)
    axios
    .get(
      `${process.env.REACT_APP_API_URL}/customers`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => setAllCustomers(response.data))
    .catch((error) => console.log("Error getting customers from API: ", error));

  }, [storedToken]);
  
  function handleInputs(evnt) {
    const newInputs = {...formInputs};
    newInputs[evnt.target.id] = evnt.target.value;
    setFormInputs(newInputs);
  }

  function handleSubmit(evnt) {
    
    evnt.preventDefault();
    console.log({ ...formInputs, owner: user._id })
    try {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/projects`, 
          { ...formInputs, owner: user._id },
          { headers: { Authorization: `Bearer ${storedToken}` } }
        )
        .then((response) => {
          setSubmitState('success');
          const newInputs = {...formInputs};
          for (const key in newInputs) {
            newInputs[key] = "";
          }
          setFormInputs(newInputs);
          navigate(`/home/projects/${response.data._id}`);
          ;
        })

    } catch (error) {
      console.log("Error creating project: ", error)
      setSubmitState("error");
    }

  }

  return (
    <div className="p-5 res-width-container">
      <h1 className="mb-5">Add Project</h1>
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
            <Form.Group controlId="season" className="mx-2">
              <Form.Label>Season</Form.Label>
              <Form.Select aria-label={ formInputs.season } onChange={ handleInputs }>
                <option></option>
                {
                  enumArrays.season.map((season, index) => (
                    <option key={ index } value={ season }>{ season }</option>
                  ))
                }
              </Form.Select>
            </Form.Group>
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
            <Form.Group controlId="status" className="mx-2">
              <Form.Label> Project Status </Form.Label>
              <Form.Select aria-label={ formInputs.status } onChange={ handleInputs }>
                <option> </option>
                {
                  enumArrays.status.map((status, index) => (
                    <option key={ index } value={ status }>{ status }</option>
                  ))
                }
              </Form.Select>
            </Form.Group>
          </div>
          <Form.Group controlId="customer">
            <Form.Label> Customer </Form.Label>
            <Form.Select aria-label={ formInputs.customer } onChange={ handleInputs }>
              <option> </option>
              {
                allCustomers.map(customer => (
                  <option key={ customer._id } value={ customer._id }>
                    { `${customer.firstName} ${customer.lastName} (${customer.email})` } 
                  </option>
                ))
              }
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="managers">
            <Form.Label> Project Managers </Form.Label>
            <Form.Select aria-label={ formInputs.managers } onChange={ handleInputs }>
              <option> </option>
              {
                allUsers.map(user => (
                  <option key={ user._id } value={ user._id }>
                    { `${user.firstName} (${user.email})` } 
                  </option>
                ))
              }
            </Form.Select>
          </Form.Group>

          <Button className="bg-secondary-cstm text-primary-cstm mt-4" variant="secondary-cstm" type="submit">Add Project</Button>
        </Form>
        { submitState === 'success' && <h4 className="mt-4 bg-success-cstm text-white"> Project successfully created. </h4> }
        { submitState === 'error' && <h4 className="mt-4 bg-error-cstm"> Error creating project. Please try again. </h4> }
    </div>
  )
}
