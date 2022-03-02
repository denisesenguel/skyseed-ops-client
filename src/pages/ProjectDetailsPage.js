import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function ProjectDetailsPage() {
  return (
    <div>
        ProjectDetailsPage
        <Button>Edit</Button>
        <Button>Delete</Button>
        <Routes>
            <Route path="/projects/:projectId/edit" element={ <div>Edit Project</div>} />
        </Routes>
    </div>
  )
}
