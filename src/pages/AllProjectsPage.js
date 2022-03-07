import React from 'react';
import ProjectsList from '../components/ProjectsList';
import useShowSuccess from '../hooks/useShowSuccess';
import SuccessToast from '../components/SuccessToast';

export default function AllProjectsPage(props) {

    const { projects } = props;
    
    const { showSuccess, toggleShowSuccess, successMessage } = useShowSuccess();

    return (
        <div className="p-5">
            <h1 className="mb-5">All Projects</h1>
            <ProjectsList projects={ projects }/>

            <SuccessToast
                showSuccess={ showSuccess }
                toggleShowSuccess={ toggleShowSuccess }
                message={ successMessage }
            />
        </div>
      )
}
