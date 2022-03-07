import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function useShowSuccess() {
    
    const [ searchParams ] = useSearchParams();
    const created = searchParams.get('created') ? true : false;
  
    const [showSuccess, setShowSuccess] = useState(created);
    const [successMessage, setSuccessMessage] = useState(created ? "Successfully created" : null);
  
    const toggleShowSuccess = () => setShowSuccess((previous) => !previous);

    return { showSuccess, toggleShowSuccess, successMessage, setSuccessMessage }
}
