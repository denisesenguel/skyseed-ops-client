import React from 'react'
import { Routes, Route } from 'react-router-dom';
import ProjectsList from '../components/ProjectsList';
import ProjectDetailsPage from './ProjectDetailsPage';
import ProjectCreatePage from './ProjectCreatePage';
import CustomersPage from './CustomersPage';
import CustomerDetailsPage from './CustomerDetailsPage';
import CustomerCreatePage from './CustomerCreatePage';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

export default function InternalHomePage() {
  return (
    <div>
      <Header />
      <div className="fix-content-height d-flex">
        <SideBar />
          <Routes>
            <Route path="/" element={ <ProjectsList /> }/>
            {/* nest further here later */}
            <Route path="/projects" element={ <ProjectsList /> }/>
            {/* My-projects might be the same page as InternalHomePage */}
            <Route path="/projects/my-projects" element={ <ProjectsList />} />
            <Route path="/projects/create" element={ <ProjectCreatePage />} />
            <Route path="/projects/:projectId" element={ <ProjectDetailsPage />} />
            <Route path="/customers" element={ <CustomersPage /> }/>
            <Route path="/customers/create" element={ <CustomerCreatePage />}/>
            <Route path="/customers/:customerId" element={ <CustomerDetailsPage /> }/>
          </Routes>
      </div>
    </div>
  )
}
