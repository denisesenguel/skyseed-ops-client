import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import exampleImg from '../images/forest_bg_website.jpg';
import ButtonMailTo from '../components/ButtonMailTo';
import SuccessToast from '../components/SuccessToast';
import useShowSuccess from '../hooks/useShowSuccess';
import { generateAlphabet } from '../utils/helpers';
import { Spinner } from 'react-bootstrap';

export default function CustomersPage() {

  const [customers, setCustomers] = useState([]);
  const { showSuccess, toggleShowSuccess, successMessage } = useShowSuccess();
  const storedToken = localStorage.getItem('authToken');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
      `${process.env.REACT_APP_API_URL}/customers`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        setIsLoading(false);
        setCustomers(response.data);
      })
      .catch((error) => {
        console.log("Error getting customers from API: ", error)
      })
    
  }, [storedToken])

  return (
    <div className="res-width-container p-5">
      <h1 className="mb-5">All Customers</h1>
      {
        isLoading ?
          <Spinner animation="border" variant="secondary-cstm" /> :
          (customers.length === 0) ?
            <p>No customers found.</p> :
            <>
              {
                generateAlphabet().map((letter, index) => (
                  <ListGroup key={ index } className="mb-1">
                    <ListGroup.Item className="bg-neutral-grey text-secondary-cstm"> { letter } </ListGroup.Item>
                    {
                      (customers.filter(customer => customer.lastName.indexOf(letter) > -1).length === 0) ?
                        <ListGroup.Item className="text-muted"> None </ListGroup.Item> :
                        customers
                          .filter(customer => customer.lastName.indexOf(letter) > -1)
                          .map((customer, index) => (
                            <ListGroup.Item className="text-primary-cstm d-flex align-items-center p-3" key={ index }>
                              <img className="rounded-circle fix-img-height" src={ exampleImg } alt={ customer.lastName } />
                              <div className="mx-3 mb-0"> 
                                <h6 className="mb-1"> { customer.firstName } { customer.lastName } </h6>
                                <ButtonMailTo label={ customer.email } mailto={ `mailto:${customer.email}` }/>
                              </div> 
                            </ListGroup.Item>
                      ))
                    }
                  </ListGroup>
                ))
              }
            </>
      }
      
    <SuccessToast
      showSuccess={ showSuccess }
      toggleShowSuccess={ toggleShowSuccess }
      message={ successMessage }
    />
    </div>
  )
}
