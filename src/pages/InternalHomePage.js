import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import AllProjectsPage from './AllProjectsPage';
import MyProjectsPage from './MyProjectsPage';
import ProjectDetailsPage from './ProjectDetailsPage';
import ProjectCreatePage from './ProjectCreatePage';
import AllCustomersPage from './AllCustomersPage';
import CustomerCreatePage from './CustomerCreatePage';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import useSidebar from '../hooks/useSidebar';

export default function InternalHomePage() {

  const { sidebar, toggleSidebar } = useSidebar();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const storedToken = localStorage.getItem('authToken');

  useEffect(fetchProjects, [storedToken]);
  
  function fetchProjects() {
    setIsLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/projects`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        setProjects(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.log("Could not get projects from DB: ", error));
  }

  return (
    <div>
      <Header />
      <div className="d-flex bg-neutral-grey">
        <SideBar sidebar={ sidebar } toggleSidebar={ toggleSidebar }/>
          <div className={ `fix-content-height fix-content-width ${ !sidebar && "hidden" }` }>     
            <Routes>
              <Route 
                path="/" 
                element={ <MyProjectsPage projects={ projects } isLoading={ isLoading } /> }
              />
              <Route 
                path="/projects" 
                element={ <AllProjectsPage projects={ projects } isLoading={ isLoading }/> }
              />
              <Route 
                path="/projects/my-projects" 
                element={ <MyProjectsPage projects={ projects } isLoading={ isLoading }/>}   
              />
              <Route path="/projects/create" element={ <ProjectCreatePage fetchProjects={ fetchProjects } />} />
              <Route path="/projects/:projectId" element={<ProjectDetailsPage fetchProjects={ fetchProjects } />} />
              <Route path="/customers" element={ <AllCustomersPage /> }/>
              <Route path="/customers/create" element={ <CustomerCreatePage />}/>
            </Routes>
          </div>
      </div>
    </div>
  )
}
