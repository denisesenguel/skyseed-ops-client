import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';
import ListGroup from 'react-bootstrap/ListGroup';
import exampleImg from '../images/forest_bg_website.jpg';
import ButtonMailTo from '../components/ButtonMailTo';
import SuccessToast from '../components/SuccessToast';
import useShowSuccess from '../hooks/useShowSuccess';
import { generateAlphabet, lastNameStartsWith } from '../utils/helpers';
import { Spinner } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';

export default function CustomersPage() {

  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const { showSuccess, toggleShowSuccess } = useShowSuccess();
  const storedToken = localStorage.getItem('authToken');
  const fuse = new Fuse(customers, {
    keys: [
      'firstName',
      'lastName'
    ],
    includeScore: true
  })
  const searchResults = fuse.search(query);
  const customersToShow = (query === '') ? customers : searchResults.map(result => result.item);

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
          <>
            <div className="mb-2">
              <SearchBar query={ query } setQuery={ setQuery } width={100} />
            </div>
            {
              customersToShow.length === 0 ?
                <p>No customers found.</p> :
                generateAlphabet().map((letter, index) => (
                        (customersToShow.filter(customer => lastNameStartsWith(customer.lastName, letter)).length > 0) &&
                          <>
                          <ListGroup key={ index } className="mb-1 shadow">
                            <ListGroup.Item className="bg-neutral-grey text-secondary-cstm"> { letter } </ListGroup.Item>
                            {
                              customersToShow
                                .filter(customer => lastNameStartsWith(customer.lastName, letter))
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
                          </>
                  ))
            }
          </>
      }
      
    <SuccessToast
      showSuccess={ showSuccess }
      toggleShowSuccess={ toggleShowSuccess }
      message={ "Customers successfully created" }
    />
    </div>
  )
}
