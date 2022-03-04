import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function CustomerCreatePage() {

  const [formInputArray, setFormInputs] = useState([{}]);

  function handleInputs(index, evnt) {
    const newInputs = {...formInputArray[index]};
    console.log(newInputs);
    newInputs[evnt.target.id] = evnt.target.value;
    setFormInputs((previous) => previous[index] = newInputs);
  }

  function addForm() {
    setFormInputs((previous) => [...previous, {}]);
  }

  console.log("formarray:", formInputArray);
  return (
    <div className="px-5 res-width-container">
      <h2 className="my-4">Add new Customer</h2>
      <Form>
        {
          formInputArray.map((formInputs, index) => (
            <><h6 className="mt-4">Customer { index + 1 }</h6>
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
        <Button onClick={ addForm } className="bg-secondary-cstm text-primary-cstm mt-4" variant="custom" >AddMore</Button>
        <br />
        <Button type="submit" className="bg-secondary-cstm text-primary-cstm mt-4" variant="custom" >Create</Button>
      </Form>
    </div>
  )
}
