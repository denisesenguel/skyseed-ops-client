import React from 'react';
import ProjectsList from '../components/ProjectsList';

export default function AllProjectsPage(props) {

    const { projects } = props;
    
    return (
        <div className="p-5">
            <h1 className="mb-5">My Projects</h1>
            <ProjectsList projects={ projects }/>
        </div>
      )
}
