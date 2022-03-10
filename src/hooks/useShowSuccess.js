import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function useShowSuccess() {
    
    const [ searchParams ] = useSearchParams();
    const created = searchParams.get('created') ? true : false;
    const deleted = searchParams.get('deleted') ? true : false;

    const [showSuccess, setShowSuccess] = useState(created || deleted);
  
    const toggleShowSuccess = () => setShowSuccess((previous) => !previous);

    return { showSuccess, toggleShowSuccess }
}
