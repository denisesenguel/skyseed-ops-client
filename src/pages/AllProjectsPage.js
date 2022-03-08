import React from 'react';
import ProjectsList from '../components/ProjectsList';
import useShowSuccess from '../hooks/useShowSuccess';
import SuccessToast from '../components/SuccessToast';
import Spinner from 'react-bootstrap/Spinner';

export default function AllProjectsPage(props) {

    const { projects, isLoading } = props;
    const { showSuccess, toggleShowSuccess, successMessage } = useShowSuccess();

    return (
        <div className="p-5">
            <h1 className="mb-5">All Projects</h1>
            {
                isLoading ?
                    <Spinner animation="border" variant="secondary-cstm"/> :
                    <ProjectsList projects={ projects }/>
            }
            <SuccessToast
                showSuccess={ showSuccess }
                toggleShowSuccess={ toggleShowSuccess }
                message={ successMessage }
            />
        </div>
      )
}
