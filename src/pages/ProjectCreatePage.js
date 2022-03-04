import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import DropDown from '../components/DropDown';
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
    .then((response) => {
      const usersFormatted = response.data.map(user => {
        return {
          selectString: `${user.firstName} (${user.email})`,
          _id: user._id
        };
      })
      setAllUsers(usersFormatted);
    })
    .catch((error) => console.log("Error getting users from API: ", error));
    
    // get list of all customer names incl emails (for unique matching)
    axios
    .get(
      `${process.env.REACT_APP_API_URL}/customers`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => {
      const customersFormatted = response.data.map(customer => {
        return {
          selectString: `${customer.firstName} ${customer.lastName} (${customer.email})`,
          _id: customer._id
        };
      })
      setAllCustomers(customersFormatted);
    })
    .catch((error) => console.log("Error getting customers from API: ", error));
  }, [storedToken]);
  
  function handleInputs(evnt) {
    const newInputs = {...formInputs};
    newInputs[evnt.target.id] = evnt.target.value;
    setFormInputs(newInputs);
  }

  function handleSubmit(evnt) {
    
    evnt.preventDefault();

    try {
      const { customer: customerString, managers: managerString, ...rest} = formInputs;
      const customerId = allCustomers.filter(customer => customer.selectString === customerString)[0]["_id"];
      // this below needs to be modified
      const managerIds = allUsers.filter(user => user.selectString === managerString)[0]["_id"];
      
      const reqBody = {...rest, customer: customerId, managers: managerIds, owner: user._id};
  
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/projects`, 
          reqBody,
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
    <div className="px-5 res-width-container">
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
              optionsArray={ enumArrays.season } 
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
              optionsArray={ enumArrays.status } 
              label="Status" 
              fieldName="status" 
              formInputs={ formInputs }
              onChange={ handleInputs }
            />
          </div>
          <DropDown 
            optionsArray={ allCustomers.map(customer => customer.selectString) } 
            label="Client" 
            fieldName="customer" 
            formInputs={ formInputs }
            onChange={ handleInputs }
          />
          <DropDown 
            optionsArray={ allUsers.map(user => user.selectString) } 
            label="Pick at least one Project Manager" 
            fieldName="managers" 
            formInputs={ formInputs }
            onChange={ handleInputs }
          />
          <Button className="bg-secondary-cstm text-primary-cstm mt-4" variant="secondary-cstm" type="submit">Add Project</Button>
        </Form>
        { submitState === 'success' && <h4 className="mt-4 bg-success-cstm text-white"> Project successfully created. </h4> }
        { submitState === 'error' && <h4 className="mt-4 bg-error-cstm"> Error creating project. Please try again. </h4> }
    </div>
  )
}
