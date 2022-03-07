import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function useShowSuccess() {
    
    const [ searchParams ] = useSearchParams();
    const created = searchParams.get('created') ? true : false;
    const deleted = searchParams.get('deleted') ? true : false;
  
    let message;
    if (created) {
        message = "Successfully created";
    } else if (deleted) {
        message = "Successfully deleted";
    }

    const [showSuccess, setShowSuccess] = useState(created || deleted);
    const [successMessage, setSuccessMessage] = useState(message);
  
    const toggleShowSuccess = () => setShowSuccess((previous) => !previous);

    return { showSuccess, toggleShowSuccess, successMessage, setSuccessMessage }
}
