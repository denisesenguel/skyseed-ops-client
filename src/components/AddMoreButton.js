import React from 'react';
import Button from 'react-bootstrap/Button';
import * as FiIcons from 'react-icons/fi';

export default function AddMoreButton() {
  return (
    <div>
        <Button
                      variant="custom"
                      className="text-primary-cstm d-flex align-items-center px-0"
                    >
                      <FiIcons.FiPlus className="text-primary-cstm mx-1" />
                      Add more
                    </Button>
    </div>
  )
}
