import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { enumArrays } from '../config/dataConfigs';
import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';

export default function ProjectCreatePage() {

  const navigate = useNavigate();
  const [formInputs, setFormInputs] = useState({ managers: [''] });
  const [allUsers, setAllUsers] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [failure, setFailure] = useState({ hasOccured: false });
  const [isLoading, setIsLoading] = useState(false);
  
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem('authToken');

  useEffect(() => {
    
    setIsLoading(true);
    
    // get list of all users and customers for form select fields
    axios
    .get(
      `${process.env.REACT_APP_API_URL}/users`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => setAllUsers(response.data))
    .then(() => {
      return axios.get(
        `${process.env.REACT_APP_API_URL}/customers`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
    })
    .then((response) => {
      setIsLoading(false);
      setAllCustomers(response.data)
    })
    .catch((error) => console.log("Error getting users and customers from API: ", error));

  }, [storedToken]);
  
  function handleInputs(evnt, index=null) {

    const newInputs = JSON.parse(JSON.stringify(formInputs));
    if (evnt.target.id === 'managers') {
      newInputs[evnt.target.id][index] = evnt.target.value;
    } else {
      newInputs[evnt.target.id] = evnt.target.value;
    }
    setFormInputs(newInputs);
  }

  function addSelectField() {
    const newInputs = JSON.parse(JSON.stringify(formInputs));
    newInputs.managers.push({});
    setFormInputs(newInputs);
  }

  function removeSelectField() {
    if (formInputs.managers.length > 1) {
      const newInputs = JSON.parse(JSON.stringify(formInputs));
      newInputs.managers.pop();
      setFormInputs(newInputs);
    }
  }

  function handleSubmit(evnt) {
    evnt.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/projects`, 
        { ...formInputs, owner: user._id },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        navigate(`/home/projects/${response.data._id}?created=true`);
      })
      .catch((error) => {
        console.log("Error creating project: ", error);
        setFailure({
          hasOccured: true,
          message: error.response.data.error.message
        });
      })
  }

  return (
    <div className="p-5 res-width-container">
      {
        isLoading ? 
          <Spinner animation="border" variant="secondary-cstm"/> :
          <>
          <h1 className="mb-5">Add Project</h1>
            <Form onSubmit={ handleSubmit }>

              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                  type="text" placeholder="Forst XYZ" 
                  value={ formInputs.title } onChange={ handleInputs }  
                />
              </Form.Group>

              <div className="d-flex mt-2">
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

              <Form.Group controlId="description" className="mt-2">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                  as="textarea" rows={3} placeholder="Give a short description"
                  value={ formInputs.description } onChange={ handleInputs }
                />
              </Form.Group>

              <div className="d-flex mt-2">
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

              <Form.Group controlId="customer" className="mt-2">
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

              <Form.Group controlId="managers" className="mt-2">
                <Form.Label> Select at least one Project Manager </Form.Label>
                {
                  formInputs.managers.map((value, index) => (
                    <Form.Select aria-label={ value } onChange={ (e) => handleInputs(e, index) } className="my-1">
                      <option> </option>
                      {
                        allUsers.map(user => (
                          <option key={ user._id } value={ user._id }>
                            { `${user.firstName} (${user.email})` } 
                          </option>
                        ))
                      }
                    </Form.Select>
                  ))
                }
                <div className="mt-2">
                  <Button 
                    onClick={ addSelectField } 
                    variant="custom" size="sm"
                    className="border-primary-cstm text-primary-cstm" 
                  >
                    Add More
                  </Button>
                  <Button 
                    onClick={ removeSelectField } 
                    variant="custom" size="sm mx-2"
                    className="border-primary-cstm text-primary-cstm" 
                  > 
                    Remove
                  </Button>
                </div>
              </Form.Group>

              <Button className="bg-secondary-cstm text-primary-cstm mt-4" variant="custom" type="submit">
                Add Project
              </Button>
            </Form>
            { failure.hasOccured && <h4 className="mt-4 text-error-cstm"> Error creating project. { failure.message } </h4> }
          </>
      }
    </div>
  )
}
