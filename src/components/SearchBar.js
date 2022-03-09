import React from 'react';
import { Form, FormGroup } from 'react-bootstrap';

export default function SearchBar(props) {

    // TODO: change color of x and add search icon
    const { query, setQuery, width } = props;
    return (
        <>  
        <FormGroup className={ `w-${width}` }>
          <Form.Control 
            type="search" 
            placeholder="Search..." 
            value={ query } 
            onChange={ (e) => setQuery(e.target.value) }
          />
        </FormGroup>
        </>
  )
}
