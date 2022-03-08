import React from 'react';
import ProjectsList from '../components/ProjectsList';
import Spinner from 'react-bootstrap/Spinner';

export default function AllProjectsPage(props) {

    const { projects, isLoading } = props;
    
    return (
        <div className="p-5">
            {
                isLoading ?
                    <Spinner animation="border" variant="secondary-cstm"/> :
                    <>
                        <h1 className="mb-5">My Projects</h1>
                        <ProjectsList projects={ projects }/>
                    </>
            }
        </div>
      )
}
