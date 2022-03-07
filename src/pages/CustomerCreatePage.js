import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CustomerCreatePage() {

  const navigate = useNavigate();
  const [formInputArray, setFormInputArray] = useState([{}]);
  const [failure, setFailure] = useState({ hasOccured: false });

  const storedToken = localStorage.getItem('authToken');

  function handleInputs(index, evnt) {
    const newInputs = {...formInputArray[index]};
    newInputs[evnt.target.id] = evnt.target.value;
    setFormInputArray((previous) => {
      previous[index] = newInputs;
      return previous;
    });
  }

  const addForm = () => setFormInputArray((previous) => [...previous, {}]);

  function removeForm() {
    if (formInputArray.length > 1) {
      const newArr = [...formInputArray];
      newArr.pop();
      setFormInputArray(newArr);
    }
  }

  function createCustomers(evnt) {
    evnt.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/customers`, 
        formInputArray,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then(() => navigate("/home/customers"))
      .catch((error) => {
        console.log("Error creating Customer(s): ", error);
        setFailure({hasOccured: true, message: error.response.data.message});
      })
  }

  return (
    <div className="p-5 res-width-container">
      
      { failure.hasOccured && <h6 className="text-error-cstm text-center mt-4">{ failure.message }</h6> }

      <h1>Add Customers</h1>
      <Form onSubmit={ createCustomers }>
        {
          formInputArray.map((formInputs, index) => (
            <><h5 className="my-3 mt-5">Customer { index + 1 }</h5>
              <div className="d-flex w-100">
                <Form.Group className="w-50" controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text" placeholder="Horst"
                    value={formInputs.firstName} onChange={ (e) => handleInputs(index, e) } />
                </Form.Group>
                <Form.Group className="w-50" controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text" placeholder="Forst"
                    value={formInputs.lastName} onChange={ (e) => handleInputs(index, e) } />
                </Form.Group>
              </div>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email" placeholder="horst@forst.de"
                  value={formInputs.email} onChange={ (e) => handleInputs(index, e) } />
              </Form.Group></>
          ))
        }
        <Button onClick={ addForm } className="bg-secondary-cstm text-primary-cstm mt-4" variant="custom" >Add More</Button>
        <Button onClick={ removeForm } className="bg-secondary-cstm text-primary-cstm mt-4 mx-2" variant="custom" >Remove</Button>
        <br />
        <Button type="submit" className="bg-secondary-cstm text-primary-cstm mt-4" variant="custom" >Create All</Button>
      </Form>
    </div>
  )
}
