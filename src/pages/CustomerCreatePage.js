import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';

export default function CustomerCreatePage() {

  const navigate = useNavigate();
  const [failure, setFailure] = useState({ hasOccured: false });
  //const [formInputArray, setFormInputArray] = useState([{}]);
  const storedToken = localStorage.getItem('authToken');
  
  // create all form handlers
  const { register, handleSubmit, formState: { errors }, control, watch} = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "newCustomers"
  })
  const watchFieldsArray = watch("newCustomers");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldsArray[index]
    }
  })
  // initialize controlled Fields array on initial render
  const emptyCustomer = {
    firstName: "", 
    lastName:"", 
    email:""
  }
  useEffect(() => append(emptyCustomer), [])

  function createCustomers(data) {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/customers`, 
        data.newCustomers,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then(() => navigate("/home/customers?created=true"))
      .catch((error) => {
        console.log("Error creating Customer(s): ", error);
        setFailure({hasOccured: true, message: error.response.data.message});
      })
  }

  return (
    <div className="p-5 res-width-container">
      
      { failure.hasOccured && <h6 className="text-error-cstm text-center mt-4">{ failure.message }</h6> }

      <h1>Add Customers</h1>
      <Form onSubmit={ handleSubmit(createCustomers) }>
        {
          controlledFields.map((fields, index) => (
            <>
              <h5 key={ fields.id } className="my-3 mt-5">Customer { index + 1 }</h5>
              <div className="d-flex w-100">
                <Form.Group className="w-50" controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text" placeholder="Horst"
                    className={errors.newCustomers?.[index]?.firstName ? "my-1 invalid" : "my-1"}
                    {...register(`newCustomers.${index}.firstName`, {required:true})}
                  />
                  {
                    errors.newCustomers?.[index] &&
                    (Object.entries(errors.newCustomers?.[index])?.length < 3 || index === 0) &&
                    errors.newCustomers?.[index]?.firstName &&
                    <p className="text-danger font-s mt-1 mb-0">Required Field</p>
                  }
                </Form.Group>
                <Form.Group className="w-50" controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text" placeholder="Forst"
                    className={errors.newCustomers?.[index]?.lastName ? "my-1 invalid" : "my-1"}
                    {...register(`newCustomers.${index}.lastName`, {required:true})}
                  />
                  {
                    errors.newCustomers?.[index] &&
                    (Object.entries(errors.newCustomers?.[index])?.length < 3 || index === 0) &&
                    errors.newCustomers?.[index]?.lastName &&
                    <p className="text-danger font-s mt-1 mb-0">Required Field</p>
                  }
                </Form.Group>
              </div>
              <Form.Group className="mt-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email" placeholder="horst@forst.de"
                  className={errors.newCustomers && errors.newCustomers[index]?.email ? "my-1 invalid" : "my-1"}
                  {...register(`newCustomers.${index}.email`,
                  {
                    required:{
                      value: true,
                      message: "Required Field"
                    },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                      message: "Please provide a valid email adress."
                    }
                  })} />
                  {
                    errors.newCustomers?.[index] &&
                    (Object.entries(errors.newCustomers?.[index])?.length < 3 || index === 0) &&
                    errors.newCustomers?.[index]?.email &&
                      <p className="text-danger font-s mt-1 mb-0"> 
                        { errors.newCustomers[index].email.message } 
                      </p>
                  }
              </Form.Group>
              {
                errors.newCustomers?.[index] &&
                Object.entries(errors.newCustomers?.[index])?.length === 3 && 
                  index > 0 &&
                  <p className="text-danger mt-1 mb-0"> Remove empty fields if unused! </p> 
              }
            </>
          ))
        }
        <Button 
          onClick={ () => append(emptyCustomer) } 
          className="border-secondary-cstm text-secondary-cstm mt-4" 
          variant="custom" 
          size="sm"
        >Add More</Button>
        <Button 
          onClick={ () => controlledFields.length > 1 ? remove(controlledFields.length - 1) : null } 
          className="border-secondary-cstm text-secondary-cstm mt-4 mx-2" 
          variant="custom" 
          size="sm"
        >Remove</Button>
        <br />
        <Button 
          type="submit" 
          className="bg-secondary-cstm text-primary-cstm mt-4" 
          variant="custom" 
        >Create All</Button>
      </Form>
    </div>
  )
}
